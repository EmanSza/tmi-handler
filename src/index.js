const fs = require('fs');
const path = require('path');
const log = require('./log');
const eventReturn = require('./events');
const tmi = require('tmi.js');
//Call super
module.exports = class TwitchWrapper {
  constructor(options) {
    // Constructor Options
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
    this.typeScript = options.typeScript || false;

    // The commands array will hold all the commands that are loaded
    this.commands = [];

    // The events array will hold all the events that are loaded
    this.events = [];

    // a array of event types that will be loaded
    this.eventTypes = [
      'action',
      'anongiftpaidupgrade',
      'ban',
      'chat',
      'cheer',
      'clearchat',
      'connected',
      'connecting',
      'cisconnected',
      'emoteonly',
      'emotesets',
      'followersonly',
      'giftpaidupgrade',
      'Hosted',
      'hosting',
      'join',
      'logon',
      'message',
      'messagedeleted',
      'mod',
      'mods',
      'Notice',
      'part',
      'ping',
      'pong',
      'r9kbeta',
      'saided',
      'raw_message',
      'reconnect',
      'resub',
      'roomstate',
      'serverchange',
      'slowmode',
      'subgift',
      'submysterygift',
      'subscribers',
      'subscription',
      'timeout',
      'unhost',
      'unmod',
      'VIPs',
      'whisper',
    ];

    this.cLog = new log({ botName: this.username });

    // If options are not defined throw errors`
    if (this.commandPath != undefined)
      throw new Error(
        'commadPath is deprecated from the options object please use loadCommands'
      );

    // if the user is using eventPath, throw an error
    if (this.eventPath != undefined)
      throw new Error(
        'eventPath is deprecated from the options object please use loadEvents'
      );

    if (!this.options.channels) throw new Error('Channels are not defined');

    if (!this.options.username) throw new Error('Username is not defined');

    if (!this.options.password) throw new Error('Password is not defined');

    // If debug is true, log the following
    if (this.debug) {
      console.log('Debug mode is on');
      console.log('Channels: ' + this.channels);
      if (!this.contentCreator) {
        console.log('Username: ' + this.username);
        console.log('Password: ' + this.password);
      }
    }

    const client = new tmi.client({
      options: { debug: this.debug },
      // Identify the bot
      identity: {
        username: this.username,
        password: this.password,
      },
      // Connect to the channels
      channels: this.channels,
    });

    this.client = client;

    // Connect to Twitch IRC Server and log the connection
    client
      .connect()
      .then(() => {
        this.cLog.login(this.username);
      })
      .catch(err =>
        console.error('An error occurred while trying to connect to Twitch API:', err)
      );

    // When a message is recieved, run the message function
    client.on('message', (channel, userstate, message, self) => {
      // if self is true and selfDetection is true, run the message function
      if (this.selfDetection && self) return;
      this.message({ client, channel, userstate, message, self });
    });
  }

  loadCommands(commandPath = '/commands') {
    return new Promise((resolve, reject) => {
      // Create a for loop that counts the amount of files in the directory
      let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), {
        withFileTypes: true,
      });
      // Loops through the files
      for (const file of files) {
        if (file.isDirectory()) {
          // Read the files in the directory
          this.loadCommandsNoCLog(`${commandPath}/${file.name}`);
        }
        // If the File is a file, run the command
        else if (file.name.endsWith(this.typeScript ? '.ts' : '.js')) {
          // require the file so we can get the command object
          let command = require(path.resolve(
            process.cwd() + commandPath + '/' + file.name
          ));
          // Push the command into the commands array
          if (command.default) command = command.default;
          command.length
            ? command.forEach(cmd => {
                this.commands.push(cmd);
                this.cLog.loaded('Command', cmd.name);
              })
            : (() => {
                this.commands.push(command);
                this.cLog.loaded('Command', command.name);
              })();
          // Add up i to the amount of files from the scoped i variable
          // Log the Command being pushed into the array
        }
      }
      this.cLog.totalLoaded('Commands', this.commands.length);
      resolve(this.commands);
    });
  }

  loadCommandsNoCLog(commandPath) {
    // Create a for loop that counts the amount of files in the directory
    let files = fs.readdirSync(path.resolve(process.cwd() + commandPath), {
      withFileTypes: true,
    });
    // Loops through the files
    for (const file of files) {
      if (file.isDirectory()) {
        this.loadCommandsNoCLog(`${commandPath}/${file.name}`);
      }
      // If the File is a file, run the command
      else if (file.name.endsWith(this.typeScript ? '.ts' : '.js')) {
        // require the file so we can get the command object
        let command = require(path.resolve(
          process.cwd() + commandPath + '/' + file.name
        ));
        // Push the command into the commands array
        if (command.default) command = command.default;
        command.length
          ? command.forEach(cmd => {
              this.commands.push(cmd);
              this.cLog.loaded('Command', cmd.name);
            })
          : (() => {
              this.commands.push(command);
              this.cLog.loaded('Command', command.name);
            })();
        // Log the Command being pushed into the array
        this.cLog.loaded('Command', command.name);
      }
    }
    return;
  }

  loadEvents(eventPath = '/commands') {
    // Events Will be handled by name of the file, so if you have a file called test.js, it will be called test
    return new Promise((resolve, reject) => {
      console.log(
        '\x1b[33mPlease keep in mind that \x1b[7msubdirectories\x1b[0m',
        "\x1b[33mwon't work while loading events."
      );
      let files = fs
        .readdirSync(path.resolve(process.cwd() + eventPath), {
          withFileTypes: true,
        })
        .filter(file => file.name.endsWith(this.typeScript ? '.ts' : '.js'));
      // Create a for loop that counts the amount of files in the directory

      for (const file of files) {
        if (file.isFile()) {
          let eventFile = require(path.resolve(
            process.cwd() + eventPath + '/' + file.name
          ));
          const eventObj = {
            eventName:
              eventFile.default.event.toLowerCase() || eventFile.event.toLowerCase(),
            execute: eventFile.default.execute || eventFile.execute,
          };
          if (this.events.some(e => e.eventName == eventObj.eventName)) {
            reject(`Event ${eventObj.eventName} already exists`);
            break;
          }
          // If the file name is in the eventTypes array, run the event
          if (this.eventTypes.includes(eventObj.eventName)) {
            this.events.push(eventObj);
            this.cLog.loaded('Event', eventObj.eventName);
          } else {
            this.cLog.error('Event', 'Does Not Match a Event Type ', eventObj.eventName);
          }
        }
      }
      new eventReturn(this.client, this.events, this.selfDetection, this.cLog);
      this.cLog.totalLoaded('Events', this.events.length);
      resolve(this.events);
    });
  }

  // Create a Message Function that when a message is recieved, it will check if the message is a command and if it is, it will run the command
  message({ channel, userstate, message, self, client }) {
    // If the 1st character of the message is a the prefix, run the command
    if (message[0] === this.prefix) {
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
          if (command.modOnly && !userstate.mod) {
            client.say(channel, 'You do not have permission to use this command');
            return;
          }
          // Run the command with the arguments
          command.execute(client, channel, userstate, message, self, commandArgs);
        }
      });
    }
  }
};
