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
            // Most options are the options that tmi Asks for, options like commandPath, and eventPath are all custon options,
            // More information will be within the documentation below
            channels: ['test'],
            username: 'test',
            password: 'test',
            debug: true,
            // For Pathing we require your base directory
            // If you are a content creator and dont want senseitive information showing in the console turn this to true
            contentCreator: false,

            reconnect: true   
});
    // Now we Run the functions to load commands and events
    // You can await these if you want
    handler.loadCommands("/commands");
    handler.loadEvents("/commands");
```

# Documentation

##### Class Constructor Options

|    Options    |      Value    |     Within    |   Required    |
| ------------- | ------------- | ------------- | ------------- |
|    username   |   String      |  Object       |     true     |
|   password    |   String      |  Object       |     true     |
|  channels     | Array of Strings | Object     |  true
|     prefix    |   String      |  Object       |     false Defaults to !          |
|     debug     |   Boolean     |  Object       |     false Defaults to false      |
| contentCreator|   Boolean     |  Object       |     false Defaults to false      |
|   reconnect   |   Boolean     |  Object       |     false Defaults to false      |
| selfDetection |   Boolean     |  Object       |     false Defaults to true       |

##### Class Constructor Functions
|    Name       |      Return      |     description    | 
| ------------- | ------------- | ------------- |
|  loadCommands |      Promise<this]>     |  Loads Commands (Path starts in node directory)    |
|  loadEvents   |      Promise<this>     |  Loads Events (Path starts in node directory)      |



## Channels Paramater
``channels`` - It is one of the params taken from the object in the initliser. Its value is an Array

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
## Reconnect Paramater
``reconnect`` -  Enables or disables tmi.js reconnect

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    reconnect: true
})
```
## Channels Paramater
``channels`` -  Channels the bot will join upon connection

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    channels: ["twitch"]
})
```
## Username Paramater
``username`` -  the name of the bot that you will use to connect to twitch

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    username: 'twitch'
})
```
## Password Paramater
``password`` -  the password used to connect to twitch via the bot

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    password: 'oauth:398b49348fdsk423'
})
```
## Self Detection Paramater
``selfDetection`` -  if you dont want the bot to respond to itself in any way

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    selfDetection: true
})
```
## TypeScript Parameter
``typeScript`` - wheter your code is written in TypeScript instead of JavaScript

```js

const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler ({
    typeScript: true
})
```

# Loading Command and Events

## loadCommands() method
``loadCommands()`` - function to load the command folder

- loadCommands() will default to the root of the directory, so where your license or gitignore is.

  /src/index.js | INFO | loadCommands() will default to /folderName/commands/

```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ();
    handler.loadCommands("/src/commands");
```

## load Events method
``loadEvents()`` - it is the function that loads all event files in a directory

- loadEvents() will default to the root of the directory, so where your license or gitignore is.

 /src/index.js | INFO | eventPath will default to /folderName/events/

```js

const tmiHandler = require('tmi-handler');

const handler = new tmiHandler ()
    handler.loadEvents("/src/events")
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
    modOnly : false;

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

        execute(client, channel, userstate, message, self, args){
            client.say("Pong!");
        }
    },
    {
        name: "token"

        modOnly: true,

        execute(client, channel, userstate, message, self, args){
            client.say("this is your token: :token_emoji:");
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
Type definitions and major TypeScript support was added in 2.0!

To run your `.ts` command files, pass the `typeScript` option as true
```js
import tmiHandler from "tmi-handler";

const handler = new tmiHandler({
    typeScript: true,

    // other options
})

// You can await these in case you need

handler.loadCommands("src/commands");
handler.loadEvents("src/events"); // these two will look for .ts files
```

## Command files in TypeScript
```js
import { TmiCommand } from "tmi-handler";

// export = is also supported

export default {
    name: "ping",

    modOnly: false,

    execute({client, channel, userstate, message, self, args}){
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

        execute({client, channel, userstate, message, self, args}){
            client.say(channel, "Pong!")
        }
    },
    {
        name: "token",

        modOnly: true,

        execute({client, channel, self, args}){
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