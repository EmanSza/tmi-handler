const fs = require('fs');
const path = require('path');
const log = require('./log');
const eventReturn = require('./events');
//Call super 
module.exports =  class TwitchWrapper{
    constructor(tmi, options) {
        // Constructor Options
        this.tmi = tmi;
        this.options = options;
        this.debug = options.debug || false;
        this.contentCreator = options.contentCreator || false;
        this.reconnect = options.reconnect || false;
        this.channels = options.channels || [];
        this.username = options.username;
        this.password = options.password;
        this.commandPath = options.commandPath || undefined;
        this.eventPath = options.eventPath || undefined;
        this.selfDetection = options.selfDetection || true;
        this.prefix = options.prefix || '!';
        // The commands array will hold all the commands that are loaded
        this.commands = [];
        // The events array will hold all the events that are loaded
        this.events = [];
        // a array of event types that will be loaded
        this.eventTypes = [
            'action', 'anongiftpaidupgrade', 'ban', 'chat', 'cheer', 'clearchat', 'connected', 'connecting',
            'cisconnected', 'emoteonly', 'emotesets', 'followersonly','giftpaidupgrade', 'Hosted', 'hosting', 'join', 'logon',
            'message', 'messagedeleted', 'mod', 'mods', 'Notice', 'part', 'ping', 'pong', 'r9kbeta', 'saided', 'raw_message',
            'reconnect', 'resub', 'roomstate', 'serverchange', 'slowmode', 'subgift', 'submysterygift', 'subscribers',
            'subscription', 'timeout', 'unhost', 'unmod', 'VIPs', 'whisper',
        ]
        this.cLog = new log({ botName: this.username });
        // If options are not defined throw errors`
        if(this.commandPath != undefined) {
             throw new Error("commadPath is deprecated from the options object please use loadCommands");
        }
        // if the user is using eventPath, throw an error 
        if(this.eventPath != undefined) {
            throw new Error("eventPath is deprecated from the options object please use loadEvents");
        }
        if(!this.tmi) throw new Error('TwitchWrapper requires tmi.js');
        if (!this.options.channels) {
            throw new Error('Channels are not defined');
        }
        if (!this.options.username) {
            throw new Error('Username is not defined');
        }
        if (!this.options.password) {
            throw new Error('Password is not defined');
        }
        // If debug is true, log the following
        if (this.debug ) {
            console.log('Debug mode is on');
            console.log('Channels: ' + this.channels);
            if(!this.contentCreator) {
            console.log('Username: ' + this.username);
            console.log('Password: ' + this.password);
            }
        }
        const client = new tmi.client({
            options: { debug: this.debug },
            // Identify the bot
            identity: {
                username: this.username,
                password: this.password
            },
            // Connect to the channels
            channels: this.channels
        });
        this.client = client;
        // Connect to Twitch IRC Server and log the connection
        client.connect().then(() => { this.cLog.login(this.username) });

        // When a message is recieved, run the message function
        client.on('message', (channel, userstate, message, self) => {
            // if self is true and selfDetection is true, run the message function
            if (this.selfDetection && self) return;
            this.message( { client, channel, userstate, message, self } );
        });
      // Call eventReturn to load the events
      const eventCaller = new eventReturn(this.tmi, this.client, events, this.selfDetection, this.cLog);

    }

    loadCommands (commandPath) {
        let i = 0;
        // Create a for loop that counts the amount of files in the directory
        let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), { withFileTypes: true });
        // Loops through the files
        for (const file of files) {
            // If the File is a file, run the command
            if (file.isFile()) {
                // require the file so we can get the command object
                let command = require(path.resolve(process.cwd() + commandPath + '/' + file.name));
                // Push the command into the commands array
                this.commands.push(command);
                // Add up i to the amount of files from the scoped i variable
                i++
                // Log the Command being pushed into the array
                this.cLog.loaded("Command",command.name);
            } 
        }
        // Find all the sub directories
        for(const sub of files) {
            // if the sub is a directory and not a file 
            if(sub.isDirectory()) {
                // Read the files in the directory
                let subFiles = fs.readdirSync(path.resolve(process.cwd() + commandPath + '/' + sub.name + '/' ), { withFileTypes: true} );
                for(const subFile of subFiles) {
                    // require the file
                    let command = require(path.resolve(process.cwd() + commandPath + '/' + sub.name + '/' + subFile.name));
                    // Push the command into the commands array
                    this.commands.push(command)
                    // Add up i to the amount of files from the scoped i variable
                    i++
                    // Log the Command being pushed into the array
                    log.loaded("Command",command.name);
                }
            }
        }

        this.cLog.totalLoaded("Commands", i);
        return this;
    }
    loadEvents (eventPath) {
        // Events Will be handled by name of the file, so if you have a file called test.js, it will be called test
        let i = 0;
        let files = fs.readdirSync(path.resolve(process.cwd() + eventPath), { withFileTypes: true });
        // Create a for loop that counts the amount of files in the directory
        for(i = 0; i < files.length; i++);
        
        for (const file of files) {
            if (file.isFile()) {
                let event = require(path.resolve(process.cwd() + eventPath + '/' + file.name));
                const eventObj = {
                    name: file.name.split('.')[0].toLowerCase(),
                    execute: event.execute
                }
                // If the file name is in the eventTypes array, run the event
                if (this.eventTypes.includes(eventObj.name)) {
                    this.events.push(eventObj);
                    this.cLog.loaded("Event",eventObj.name);
                } else {
                    this.cLog.error("Event", "Does Not Match a Event Type ",eventObj.name);
                    i--;
                }
            }
        }
        this.cLog.totalLoaded("Events", i);
        return this;
    }

    // Create a Message Function that when a message is recieved, it will check if the message is a command and if it is, it will run the command
    message( { channel, userstate, message, self, client } ) {
        // If the 1st character of the message is a the prefix, run the command
        if(message[0] === this.prefix) {
        // Substring the message to remove the prefix
        let command = message.substring(1).toLowerCase();
        // Split the message into an array
        let commandSplit = command.split(' ');
        // Get the command name
        let commandName = commandSplit[0];
        // Get the command arguments
        let commandArgs = commandSplit.slice(1);
        // get each command in the commands array
            this.commands.forEach(command => {
            // If the called command name is the same as the command name in the command object, run the command
                if (command.name === commandName) {
                    // If the command is mod only and the user is not a mod, return the message
                    if(command.modOnly && !userstate.mod) {
                        client.say(channel, 'You do not have permission to use this command');
                        return;
                    }
                    // Run the command with the arguments
                command.execute( { channel, userstate, message, self, commandArgs, client });
                }
            });
        }
    }
      
};