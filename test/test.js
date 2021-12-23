const tmi = require('tmi.js');
const twitchWrapper = require('../src/index.js')
    new twitchWrapper(tmi, {
            channels: ['#test'],
            username: 'test',
            password: 'test',
            debug: false,
            filePath: '/commands/',
            commandPath: '/test/commands',
            eventPath:   '/test/events',
            contentCreator: false,
            reconnect: true      
        }
    );


    // this.client = client;
    // this.options = options;
    // this.coomandPath = options.commandPath || 'commands';
    // this.eventPath = options.eventPath || 'events';
    // this.debug = options.debug;
    // this.contentCreator = options.contentCreator || false;
    // this.reconnect = options.reconnect;
    // this.channels = options.channels;
    // this.username = options.username;
    // this.password = options.password;