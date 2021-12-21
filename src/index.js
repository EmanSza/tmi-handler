const fs = require('fs');
const path = require('path');
//Call super 
module.exports = class TwitchWrapper {
    constructor(tmi, options) {
        this.tmi = tmi;
        this.options = options;
        this.commandPath = options.commandPath || '/commands';
        this.eventPath = options.eventPath || '/events';
        this.debug = options.debug;
        this.contentCreator = options.contentCreator || false;
        this.reconnect = options.reconnect;
        this.channels = options.channels;
        this.username = options.username;
        this.password = options.password;
        this.commands = [];
        this.events = [];
        this.loadCommands(this.commandPath);
        this.loadEvents(this.eventPath);
        // If options are not defined throw errors`
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
        if (this.debug && this.contentCreator === false) {
            console.log('Debug mode is on');
            console.log('Channels: ' + this.channels);
            console.log('Username: ' + this.username);
            console.log('Password: ' + this.password);
        }
        const client = new tmi.client({
            options: { debug: this.debug },
            identity: {
                username: this.username,
                password: this.password
            },
            channels: this.channels
        });
        client.connect();

        client.on('message', (channel, userstate, message, self) => {
            if (self) return;
            this.message({ channel, userstate, message });
        }); 
        client.on('subscription', (channel, username, method, message, userstate) => {
            this.subscriber(channel, userstate);
        });
        
    }
    loadCommands(commandPath) {
        let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), { withFileTypes: true });
        console.log(files);
        for (const file of files) {
            if (file.isFile()) {
                console.log(file.name);
                let command = require(path.resolve(process.cwd() + commandPath + '/' + file.name));
                this.commands.push(command);
            }
        }
    }
    loadEvents(eventPath) {
        let files = fs.readdirSync(path.resolve(process.cwd() + eventPath), { withFileTypes: true });
        console.log(files);
        for (const file of files) {
            if (file.isFile()) {
                console.log(file.name);
                let command = require(path.resolve(process.cwd() + eventPath + '/' + file.name));
                this.commands.push(command);
            }
        }
    }

    // Create a Message Function that when a message is recieved, it will check if the message is a command and if it is, it will run the command
    message(message) {
        if (message.message[0] === '!') {
            let command = message.message.substring(1);
            let commandSplit = command.split(' ');
            let commandName = commandSplit[0];
            let commandArgs = commandSplit.slice(1);
            this.commands.forEach(command => {
                if (command.name === commandName) {
                    command.run(message, commandArgs);
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
