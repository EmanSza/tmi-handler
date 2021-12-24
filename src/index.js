const fs = require('fs');
const path = require('path');
const log = require('./log');
//Call super 
module.exports =  class TwitchWrapper{
    constructor(tmi, options) {
        this.tmi = tmi;
        this.options = options;
        this.commandPath = options.commandPath || '/commands';
        this.eventPath = options.eventPath || '/events';
        this.debug = options.debug || false;
        this.contentCreator = options.contentCreator || false;
        this.reconnect = options.reconnect || false;
        this.channels = options.channels || [];
        this.username = options.username;
        this.password = options.password;
        this.selfDetection = options.selfDetection || true;
        this.commands = [];
        this.events = [];
        this.eventTypes = [
            'action', 'anongiftpaidupgrade', 'ban', 'chat', 'cheer', 'clearchat', 'connected', 'connecting',
            'cisconnected', 'emoteonly', 'emotesets', 'followersonly','giftpaidupgrade', 'Hosted', 'hosting', 'join', 'logon',
            'message', 'messagedeleted', 'mod', 'mods', 'Notice', 'part', 'ping', 'pong', 'r9kbeta', 'saided', 'raw_message',
            'reconnect', 'resub', 'roomstate', 'serverchange', 'slowmode', 'subgift', 'submysterygift', 'subscribers',
            'subscription', 'timeout', 'unhost', 'unmod', 'VIPs', 'whisper',
        ]
        this.cLog = new log({ botName: this.username });
        this.loadCommands(this.commandPath, this.cLog);
        this.loadEvents(this.eventPath, this.cLog);
        // If options are not defined throw errors`
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
            identity: {
                username: this.username,
                password: this.password
            },
            channels: this.channels
        });
        
        client.connect().then(() => { this.cLog.login(this.username) });

        // EVENTS
        client.on('message', (channel, userstate, message, self) => {
            if (this.selfDetection && self) return;
            this.message( { client, channel, userstate, message, self } );
        });
        // For all Events, use eventlload the event and run it
        this.events.forEach(event => {
            client.on(event.name, ( channel, userstate, client, self, username, reason, message, deletedMessage, msgid, messageCloned, address, port, enabled, sets, obj, sender, viewers, autohost, mods, latency, streakMonths, methods, state, length, recipent, numOfSubs, duration, vips, from,) => {
                if(this.selfDetection && self) return;
                event.execute({
                    channel,userstate, client,
                    self, username, reason, message, deletedMessage, msgid, messageCloned,
                    address, port, enabled, sets, obj, sender, viewers, autohost, mods, latency,
                    streakMonths, methods, state, length, recipent, numOfSubs, duration, vips, from,
                });
            });
        }
    )};

    loadCommands (commandPath, log) {
        let i = 0;
        // Create a for loop that counts the amount of files in the directory
        let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), { withFileTypes: true });
        console.log(process.cwd() + commandPath);
        for(i = 0; i < files.length; i++);
        // Create a for loop that counts the amount of files in the directory
        for (const file of files) {
            if (file.isFile()) {
                let command = require(path.resolve(process.cwd() + commandPath + '/' + file.name));
                this.commands.push(command);
                log.loaded("Command",command.name);
            }
        }
        log.totalLoaded("Commands", i);
    }
    loadEvents(eventPath, log) {
        // Events Will be handled by name of the file, so if you have a file called test.js, it will be called test
        let i = 0;
        let files = fs.readdirSync(path.resolve(process.cwd() + eventPath), { withFileTypes: true });
        // Create a for loop that counts the amount of files in the directory
        for(i = 0; i < files.length; i++);
        
        for (const file of files) {
            if (file.isFile()) {
                // console.log(file.name);
                let event = require(path.resolve(process.cwd() + eventPath + '/' + file.name));
                const eventObj = {
                    name: file.name.split('.')[0],
                    execute: event.execute
                }
                // If the file name is in the eventTypes array, run the event
                if (this.eventTypes.includes(eventObj.name)) {
                    this.events.push(eventObj);
                    log.loaded("Event",eventObj.name);
                } else {
                    log.error("Event", "Does Not Match a Event Type ",eventObj.name);
                    i--;
                }
            }
        }
        log.totalLoaded("Events", i);
    }

    // Create a Message Function that when a message is recieved, it will check if the message is a command and if it is, it will run the command
    message(channel, userstate, message, self, client ) {
            if(message[0] === '!') {
                console.log(message[0])
            let command = message.substring(1);
            let commandSplit = command.split(' ');
            let commandName = commandSplit[0];
            let commandArgs = commandSplit.slice(1);
            this.commands.forEach(command => {
                if (command.name === commandName) {
                    console.log(command)
                    if(command.modOnly && !userstate.mod) {
                        client.say(channel, 'You do not have permission to use this command');
                        return;
                    }
                    command.execute(channel, userstate, message, self, commandArgs, client);
                }
            });
            }
    }
    // Is the channel gets a subscriber run code that will run the event 
    subscriber(channel, userstate) {
        this.events.forEach(event => {
            if (event.name === 'subscriber') {
                event.run(channel, userstate);
            }
        });
    }   
    };