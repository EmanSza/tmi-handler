This is a Light Weight Handler for TMI.js, This handler Offers the following

- Command Handling
- Event Handling
- Color Logging

Everything is custom built in this package

Stuff the handler Handles

- Login/Connection
- And your commands, of course

## Getting Started

This handler is all built into a class, so we need to initialise it!
```js

const tmiHandler = require('tmi-handler');

// Now Let us input the options into the class
const handler = new tmiHandler ({
    // All Options besides tmiHandler are inputed within a object
            // More information will be within the documentation below
            channels: ['test'],
            username: 'test',
            password: 'test',
            debug: true,

            // If you are a content creator and dont want senseitive information showing in the console turn this to true
            contentCreator: false,

            reconnect: true   
});
    // Now we Run the functions to load commands and events
    // You can load both synchronously or asynchronously
    handler.loadCommandsSync("/commands");
    handler.loadEventsSync("/commands");
```

# Documentation

##### Class Constructor Options

|    Options    |      Value     |  Required    |
| ------------- | ------------- |------------- |
|    username   |   String       |    true     |
|   password    |   String        |   true     |
|  channels     | Array of Strings | true
|     prefix    |   String         |  false, Defaults to !          |
|     debug     |   Boolean       |   false, Defaults to false      |
| globalCooldown | Number | false, Defaults to null
| contentCreator|   Boolean        |  false, Defaults to false      |
|   reconnect   |   Boolean        |  false, Defaults to false      |
| selfDetection |   Boolean       | false, Defaults to true       |

##### Class Constructor Functions
|    Name       |      Return      |     description    | 
| ------------- | ------------- | ------------- |
|  loadCommands |      `Promise<this>`     |  Loads Commands (Path starts in node directory)    |
|  loadEvents   |      `Promise<this>`     |  Loads Events (Path starts in node directory)      |
| loadCommandsSync | `this` | Same as `loadCommands()` but synchronous |
| loadEventsSync | `this` | Same as `loadEvents()` but synchronous |



## Channels Paramater
``channels`` - The channels that the bot will connect to. This can be changed later using `client.join()`

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    channels : ["Array", "Of", "Channel", "Names"]
})
```
## Debug Paramater
``debug`` -  Enables or disables tmi.js debugging

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    debug: true
})
```
## Prefix Paramater
``prefix`` -  Prefix for your bot commands

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    prefix: "?"
})
```
## Content Creator Paramater
``contentCreator`` -  Enables or disables sensitive information (Username and Password) in debugging

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    contentCreator: true
})
```

## Global Cooldown Parameter
``globalCooldown`` - Global cooldown for all commands, in milliseconds

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    gloabalCooldown: 1000 // 1 seconds cooldown
})
```

## Reconnect Paramater
``reconnect`` -  Enables or disables tmi.js reconnect

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    reconnect: true
})
```

## Username Paramater
``username`` - The username of your bot

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    username: 'your username'
})
```
## Password Paramater
``password`` - The password (token) of your bot

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    password: 'oauth:398b49348fdsk423'
})
```
## Self Detection Paramater
``selfDetection`` -  Whether the bot should ignore it's own messages

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    selfDetection: true
})
```
## TypeScript Parameter
``typeScript`` - Whether your code is written in TypeScript instead of JavaScript

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    typeScript: true
})
```

# Loading Command and Events

## loadCommands() method
``loadCommands(path?)`` - Loads all commands in specified directory, or `/commands` if none is specified

Examples:

```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ()
    .loadCommands("/src/commands");
```
```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ()
    .loadCommands(); // will load files in /commands
```
## load Events method
``loadEvents()`` - Loads all events in specified directory, or `/events` if none is specified

Examples:

```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ()
    .loadEvents("/src/events")
```
```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ()
    .loadEvents(); // will load files in /events
```

# Command Files
Command Files are designed to be flexible on your side

All parameters as inside objects, so you can remove/add them as you need
```js
// Inside your command folder create a command file called whatever
module.exports = {
    // Name is what ur command name will be called by, so here !ping will call this command
    name : "ping",
    // If the command can be used by only moderators or not
    modOnly : false,

    cooldown: 3000, // set 3 seconds cooldown

    // Now we will write the bit that will actually execute the code
    execute({client, channel, userstate, message, self, args}) {
        // Now we will simply tell the bot to send a message
        client.say(channel, "Pong!");
    }
    // Congrats you just made a command!
}
```

# Multiple commands per file
You can also make more than one command per command file by exporting an array of commands!

```js
module.exports = [
    {
        name: "ping",

        modOnly: false,

        execute({client, channel}){
            client.say(channel, "Pong!");
        }
    },
    {
        name: "say",

        modOnly: true,

        execute({client, channel, args}){
            client.say(channel, args.join(" "));
        }
    }
]

```

# Event Files
Events are ran by the name you pass into the file, but you cannot have duplicated events (that will throw an error).
Also, subdirectories aren't supported in events.

Parameters are also inside an object
```js
module.exports = {
    // As the paramaters we support all the params in our Event Paramaters Section
    event: "ban",

    execute({client, channel, username}) {
        // Now we will write a simple message out saying who was banned!
        client.say(channel, `${username} Was Banned!`)
    }
    // Congrats you just made a event
}
```
# TypeScript support
Type definitions and major TypeScript support was added in 1.3!

To run your `.ts` command files, pass the `typeScript` option as true
```js
import tmiHandler from "tmi-handler";

const handler = new tmiHandler({
    typeScript: true,

    // other options
})

// You can await these in case you need

handler.loadCommands("/src/commands");
handler.loadEvents("/src/events"); // these two will look for .ts files
```

## Command files in TypeScript
```js
import { TmiCommand } from "tmi-handler";

// export = is also supported

export default {
    name: "ping",

    modOnly: false,

    execute({client, channel}){
        client.say(channel, "Pong!")
    }
} as TmiCommand
```

## Multiple commands per file in TypeScript
```js
import { TmiCommand } from "tmi-handler";

// export = is also supported

export default [
    {
        name: "ping",

        modOnly: false,

        execute({client, channel}){
            client.say(channel, "Pong!")
        }
    },
    {
        name: "token",

        modOnly: true,

        execute({client, channel}){
            client.say(channel, "omg!")
        }
    }
] as TmiCommand[]
```



# Command Paramaters
- client
- channel
- userstate
- message
- self
- args
# Events
For all the events vist the tmi.js documention [here](https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md)
# Event Paramaters
 - There are so many paramaters so for a better visual visit [here](https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md)
    - channel
    - userstate
    - client
    - self
    - username
    - reason
    - message
    - deletedMessage
    - msgid
    - messageCloned
    - address
    - port
    - enabled
    - sets
    - obj
    - sender
    - viewers
    - autohost
    - mods
    - latency
    - streakMonths
    - methods
    - state
    - length
    - recipent
    - numOfSubs
    - duration
    - vips
    - from