const fs = require("fs");
const path = require("path");
const log = require("../log");
const tmi = require("tmi.js");

module.exports = class TwitchWrapper {
    #password;
    #debug;
    #contentCreator;
    #reconnect;
    #channels;
    #username;
    #selfDetection;
    #prefix;
    #typeScript;
    #globalCooldown;
    #cooldowns;
    #perCommandCooldowns;
    #commands;
    #events;
    constructor(options) {
        // Constructor Options
        this.options = options;
        this.#debug = options.debug || false;
        this.#contentCreator = options.contentCreator || false;
        this.#reconnect = options.reconnect || false;
        this.#channels = options.channels;
        this.#username = options.username;
        this.#password = options.password;
        this.#selfDetection = options.selfDetection || true;
        this.#prefix = options.prefix || "!";
        this.#typeScript = options.typeScript || false;
        this.#globalCooldown = options.globalCooldown || false;
        this.#cooldowns = this.#globalCooldown ? {} : null;
        this.#perCommandCooldowns = {};
        // The commands array will hold all the commands that are loaded
        this.#commands = [];
        // The events array will hold all the events that are loaded
        this.#events = [];

        this.cLog = new log({ botName: this.#username });

        this.#checks();

        // If debug is true, log the following
        if (this.#debug) {
            console.log("Debug mode is on");
            console.log("Channels: " + this.#channels);
            if (!this.#contentCreator) {
                console.log("Username: " + this.#username);
                console.log("Password: " + this.#password);
            }
        }
        const client = new tmi.client({
            options: { debug: this.#debug },
            // Identify the bot
            identity: {
                username: this.#username,
                password: this.#password,
            },
            // Connect to the channels
            channels: this.#channels,
            connection: { reconnect: this.#reconnect },
        });
        this.client = client;
        // Connect to Twitch IRC Server and log the connection
        client
            .connect()
            .then(() => {
                this.cLog.login(this.#username);
            })
            .catch(err => console.error("An error occurred while trying to connect to Twitch API:", err));

        // When a message is recieved, run the message function
        client.on("message", (channel, userstate, message, self) => {
            // if self is true and selfDetection is true, run the message function
            if (this.#selfDetection && self) return;
            this.#message({ client, channel, userstate, message, self });
        });
    }

    loadCommands(commandPath = "/commands") {
        if (this.#commands.length) throw new TypeError("You have already loaded commands.");

        if (this.#loadCommandsPath) commandPath = this.#loadCommandsPath;

        this.#loadCommandsPath ||= commandPath;
        return new Promise((resolve, reject) => {
            // Create a for loop that counts the amount of files in the directory
            try {
                fs.promises
                    .readdir(path.resolve(process.cwd() + commandPath), {
                        withFileTypes: true,
                    })
                    .then(files => {
                        // Loops through the files
                        for (const file of files) {
                            if (file.isDirectory()) {
                                // Read the files in the directory
                                this.#loadCommandsNoCLog(`${commandPath}/${file.name}`);
                            }
                            // If the File is a file, run the command
                            else if (file.name.endsWith(this.#typeScript ? ".ts" : ".js")) {
                                // require the file so we can get the command object
                                let command = require(path.resolve(process.cwd() + commandPath + "/" + file.name));
                                // Push the command into the commands array
                                if (command.default) command = command.default;
                                Array.isArray(command)
                                    ? command.forEach(cmd => {
                                          this.#commands.push(cmd);
                                          this.cLog.loaded("Command", cmd.name);
                                      })
                                    : (() => {
                                          this.#commands.push(command);
                                          this.cLog.loaded("Command", command.name);
                                      })();
                                // Add up i to the amount of files from the scoped i variable
                                // Log the Command being pushed into the array
                            }
                        }
                    })
                    .then(() => {
                        this.cLog.totalLoaded("Commands", this.#commands.length);
                        resolve(this);
                    });
            } catch (err) {
                reject("An error occurred while loading commands:", err);
            }
        });
    }
    loadCommandsSync(commandPath = "/commands") {
        if (this.#commands.length) throw new TypeError("You have already loaded commands.");
        if (this.#loadCommandsPath) commandPath = this.#loadCommandsPath;
        this.#loadCommandsPath ||= commandPath;

        // Create a for loop that counts the amount of files in the directory
        try {
            let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), {
                withFileTypes: true,
            });
            // Loops through the files
            for (const file of files) {
                if (file.isDirectory()) {
                    // Read the files in the directory
                    this.#loadCommandsNoCLog(`${commandPath}/${file.name}`);
                }
                // If the File is a file, run the command
                else if (file.name.endsWith(this.#typeScript ? ".ts" : ".js")) {
                    // require the file so we can get the command object
                    let command = require(path.resolve(process.cwd() + commandPath + "/" + file.name));
                    // Push the command into the commands array
                    if (command.default) command = command.default;
                    Array.isArray(command)
                        ? command.forEach(cmd => {
                              this.#commands.push(cmd);
                              this.cLog.loaded("Command", cmd.name);
                          })
                        : (() => {
                              this.#commands.push(command);
                              this.cLog.loaded("Command", command.name);
                          })();
                    // Add up i to the amount of files from the scoped i variable
                    // Log the Command being pushed into the array
                }
            }
            this.cLog.totalLoaded("Commands", this.#commands.length);
            return this;
        } catch (err) {
            throw new Error("An error occurred while loading commands:", err);
        }
    }
    async #loadCommandsNoCLog(commandPath) {
        // Create a for loop that counts the amount of files in the directory
        let files = await fs.promises.readdir(path.resolve(process.cwd() + commandPath), {
            withFileTypes: true,
        });
        // Loops through the files
        for (const file of files) {
            if (file.isDirectory()) {
                this.loadCommandsNoCLog(`${commandPath}/${file.name}`);
            }
            // If the File is a file, run the command
            else if (file.name.endsWith(this.#typeScript ? ".ts" : ".js")) {
                // require the file so we can get the command object
                let command = require(path.resolve(process.cwd() + commandPath + "/" + file.name));
                // Push the command into the commands array
                if (command.default) command = command.default;
                command.length
                    ? command.forEach(cmd => {
                          this.#commands.push(cmd);
                          this.cLog.loaded("Command", cmd.name);
                      })
                    : (() => {
                          this.#commands.push(command);
                          this.cLog.loaded("Command", command.name);
                      })();
                // Log the Command being pushed into the array
                this.cLog.loaded("Command", command.name);
            }
        }
        return;
    }
    loadEvents(eventPath = "/events") {
        if (this.#loadEventsPath) eventPath = this.#loadEventsPath;

        this.#loadEventsPath ||= eventPath;
        if (this.#events.length) throw new TypeError("You have already loaded events.");
        // Events Will be handled by name of the file, so if you have a file called test.js, it will be called test
        return new Promise((resolve, reject) => {
            fs.promises
                .readdir(path.resolve(process.cwd() + eventPath), {
                    withFileTypes: true,
                })
                .then(files => files.filter(file => file.name.endsWith(this.#typeScript ? ".ts" : ".js")))
                .then(files => {
                    for (const file of files) {
                        if (file.isFile()) {
                            let eventFile = require(path.resolve(process.cwd() + eventPath + "/" + file.name));
                            console.log(eventFile);
                            const eventObj = {
                                eventName: eventFile.default?.event?.toLowerCase() || eventFile.event.toLowerCase(),
                                execute: eventFile.default?.execute || eventFile.execute,
                            };
                            if (this.#events.some(e => e.eventName == eventObj.eventName)) {
                                reject(`Event ${eventObj.eventName} already exists`);
                                break;
                            }
                            this.#events.push(eventObj);
                            this.client.on(eventObj.eventName, (...args) => {
                                eventObj.execute(this.client, ...args);
                                });
                        }
                    }
                })
                .then(() => {
                    this.cLog.totalLoaded("Events", this.#events.length);
                    resolve(this);
                });
        });
    }

    loadEventsSync(eventPath = "/events") {
        if (this.#loadEventsPath) eventPath = this.#loadEventsPath;
        this.#loadEventsPath ||= eventPath;
        if (this.#events.length) throw new TypeError("You have already loaded events.");

        let files = fs
            .readdirSync(path.resolve(process.cwd() + eventPath), {
                withFileTypes: true,
            })
            .filter(file => file.name.endsWith(this.#typeScript ? ".ts" : ".js"));

        for (const file of files) {
            if (file.isFile()) {
                let eventFile = require(path.resolve(process.cwd() + eventPath + "/" + file.name));
                const eventObj = {
                    eventName: eventFile.default?.event?.toLowerCase() || eventFile.event.toLowerCase(),
                    execute: eventFile.default?.execute || eventFile.execute,
                };
                if (this.#events.some(e => e.eventName == eventObj.eventName)) {
                    reject(`Event ${eventObj.eventName} already exists`);
                    break;
                }
                this.#events.push(eventObj);
                this.client.on(eventObj.eventName, (...args) => {
                    eventObj.execute(this.client, ...args);
                }
                );
            }
        }

        new eventReturn(this.client, this.#events, this.#selfDetection, this.cLog);
        this.cLog.totalLoaded("Events", this.#events.length);
        return this;
    }

    // Create a Message Function that when a message is recieved, it will check if the message is a command and if it is, it will run the command
    #message({ channel, userstate, message, self, client }) {
        // methods to use in handler inside command file
        const instance = {
            getLoadedCommands: () => this.#commands,
            getDefaultPrefix: () => this.#prefix,
            getLoadedEvents: () => this.#events,
            reloadCommands: async () => {
                this.#commands = [];
                await this.loadCommands(this.#loadCommandsPath);
                return this.#commands;
            },
            reloadEvents: async () => {
                this.#events = [];
                await this.loadEvents(this.#loadCommandsPath);
                return this.#events;
            },
            reLogin: () => {
                return new Promise((resolve, reject) => {
                    this.cLog.warn("Logout:", "disconnecting from client...");
                    this.client
                        .disconnect()
                        .then(() => {
                            this.cLog.warn("Logging in:", "reconnecting to client...");
                            this.client
                                .connect()
                                .then(() => {
                                    this.cLog.login(this.client.getUsername());
                                    resolve();
                                })
                                .catch(err => reject(err));
                        })
                        .catch(err => reject(err));
                });
            },
            setDefaultPrefix: newPrefix => {
                this.#prefix = newPrefix;
                return this.#prefix;
            },
        };
        // If the 1st character of the message is a the prefix, run the command
        if (message.startsWith(this.#prefix)) {
            // Substring the message to remove the prefix
            let args = message.toLowerCase().slice(this.#prefix.length).split(" ");
            // Get the command name
            let commandName = args.shift();

            // get each command in the commands array
            this.#commands.forEach(command => {
                // If the called command name is the same as the command name in the command object, run the command
                if (command.name === commandName) {
                    // If the command is mod only and the user is not a mod, return the message
                    if (command.modOnly && !userstate.mod) {
                        client.say(channel, "You do not have permission to use this command");
                        return;
                    }

                    // check if the command has a cooldown set
                    if (command.cooldown) {
                        // check if the user is in cooldown, and if it is, tell him
                        if (this.#perCommandCooldowns[command.name]?.[userstate.id]) {
                            client.say(
                                channel,
                                `You are in cooldown to use this command! Please wait ${new Date(
                                    this.#perCommandCooldowns[command.name][userstate.id].timeLeft
                                ).getSeconds()} seconds.`
                            );
                        } else {
                            // if it's not, execute the command and add him to cooldowns list
                            this.#perCommandCooldowns[command.name] = { [userstate.id]: { timeLeft: command.cooldown } };

                            // this function delete the cooldown when it's over and update it every second
                            let fish = setInterval(() => {
                                if (this.#perCommandCooldowns[command.name][userstate.id].timeLeft <= 0) {
                                    delete this.#perCommandCooldowns[command.name][userstate.id];
                                    clearInterval(fish);
                                } else {
                                    this.#perCommandCooldowns[command.name][userstate.id].timeLeft -= 1000;
                                }
                            }, 1000);
                            // Run the command with the arguments
                            command.execute({
                                client,
                                channel,
                                userstate,
                                message,
                                self,
                                args,
                                instance,
                            });
                        }
                    }
                    // if function doesn't have a cooldown, look for global cooldown instead
                    else if (this.#globalCooldown) {
                        // its the same thing as above lol
                        if (this.#cooldowns[userstate.id]) {
                            client.say(
                                channel,
                                `You are in cooldown to use commands! Please wait ${new Date(
                                    this.#cooldowns[userstate.id].timeLeft
                                ).getSeconds()} seconds.`
                            );
                        } else {
                            this.#cooldowns[userstate.id] = { timeLeft: this.#globalCooldown };
                            let fish = setInterval(() => {
                                if (this.#cooldowns[userstate.id].timeLeft <= 0) {
                                    delete this.#cooldowns[userstate.id];
                                    clearInterval(fish);
                                } else {
                                    this.#cooldowns[userstate.id].timeLeft -= 1000;
                                }
                            }, 1000);
                            // Run the command with the arguments
                            command.execute({
                                client,
                                channel,
                                userstate,
                                message,
                                self,
                                args,
                                instance,
                            });
                        }
                    }
                    // if no cooldown is set, just run the command normally
                    else {
                        command.execute({
                            client,
                            channel,
                            userstate,
                            message,
                            self,
                            args,
                            instance,
                        });
                    }
                }
            });
        }
    }
    #checks() {
                // If options are not defined throw errors`
                if (this.commandPath) {
                    this.cLog.warn("Deprecation warning:", "commandPath option is deprecated, use .loadCommands() instead");
                }
                // if the user is using eventPath, throw an error
                if (this.eventPath) {
                    this.cLog.warn("Deprecation warning:", "eventPath option is deprecated, use .loadEvents() instead");
                }
                if (!this.options.channels) {
                    throw new TypeError("Channels are not defined");
                }
                if (!this.options.username) {
                    throw new TypeError("Username is not defined");
                }
                if (!this.options.password) {
                    throw new TypeError("Password is not defined");
                }
    }
};
