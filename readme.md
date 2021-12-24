This is a Light Weight Handler for TMI.js, This handler Offers the following

(Its so lightweight it doesnt have any dependencys)

- Command Handling
- Event Handling
- Color Logging

Everything is custom built in this package

Stuff the handler Handles

- Login/Connection

## Getting Started

This handler is all built into a class, so we need to initialise it!
```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

// Now Let us input the options into the class
// Please note that tmi is required
const tmiHandlerHandler = new tmiHandler (tmi, {
    // All Options besides tmiHandler are inputed within a object
            // Most options are the options that tmi Asks for, options like commandPath, and eventPath are all custon options,
            // More information will be within the documentation below
            channels: ['#test'],
            username: 'test',
            password: 'test',
            debug: true,
            // For Pathing we require your base directory
            commandPath: '/src/commands',
            eventPath:   '/src/events',
            // If you are a content creator and dont want senseitive information showing in the console turn this to true
            contentCreator: false,

            reconnect: true   
})
```

# Documentation
## Table of Contents  
[General Documention](#class-constructor-options)  
[Command Paramaters](#command-paramaters)   
[Events](#events)   
[Event Paramaters](#event-paramaters)


##### Class Constructor Options

|    Options    |      Value    |     Within    |   Required    |
| ------------- | ------------- | ------------- | ------------- |
|     tmi       |   tmi Package |  Paramater    |     true     |
|   Channels    |   Array       |  Object       |     false Default to []          |
|  commandPath  |   String      |  Object       |     false  Defaults to /commands |
|   eventPath   |   String      |  Object       |     false Defaults to /events    |
|    username   |   String      |  Object       |     true     |
|   password    |   String      |  Object       |     true     |
|     prefix    |   String      |  Object       |     false Defaults to !          |
|     debug     |   Boolean     |  Object       |     false Defaults to false      |
| contentCreator|   Boolean     |  Object       |     false Defaults to false      |
|   reconnect   |   Boolean     |  Object       |     false Defaults to false      |
| selfDetection |   Boolean     |  Object       |     false Defaults to true       |

## tmi Package
`` tmi `` - It is the 1st Paramater the constructor takes when initlaizing. the value is taken from the tmi.js Package

```js

const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');
const tmiHandlerHandler = new tmiHandler (tmi)
```

## Channels Paramater
``channels`` - It is one of the params taken from the object in the initliser. Its value is an Array

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    channels : ["Array", "Of", "Channel", "Names"]
})
```
## Command Path Paramater
``commandPath`` - It is the paramater that leeds to your commands folder

- commandPath will default to the root of ur folder, so if your index file is in 

 folderName/src/index.js | commandPath will default to /folderName/commands/

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    commandPath: '/src/commands/'
})
```

## Event Path Paramater
``eventPath`` - It is the paramater that leeds to your events folder

- eventPath will default to the root of ur folder, so if your index file is in 

 folderName/src/index.js | eventPath will default to /folderName/events/

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    commandPath: '/src/events/'
})
```
## Debug Paramater
``debug`` -  Enables or disables tmi.js debugging

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    debug: true
})
```
## Prefix Paramater
``prefix`` -  Enables or disables tmi.js debugging

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    prefix: "?"
})
```
## Content Creator Paramater
``contentCreator`` -  Enables or disables sensitive information (Username and Password) in debugging

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    contentCreator: true
})
```
## Reconnect Paramater
``reconnect`` -  Enables or disables tmi.js reconnect

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    reconnect: true
})
```
## Channels Paramater
``channels`` -  Channels the bot will join upon connection

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    channels: ["twitch"]
})
```
## Username Paramater
``username`` -  the name of the bot that you will use to connect to twitch

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    username: 'twitch'
})
```
## Password Paramater
``password`` -  the password used to connect to twitch via the bot

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    password: 'oauth:398b49348fdsk423'
})
```
## Self Detection Paramater
``selfDetection`` -  if you dont want the bot to respond to itself in any way

```js
const tmi = require('tmi.js')
const tmiHandler = require('tmi-handler');

const tmiHandlerHandler = new tmiHandler (tmi, {
    selfDetection: true
})
```
# Command Files
Command Files are designed to be flexible on your side
```js
// Inside your command folder create a command file called whatever
module.exports = {
    // Name is what ur command name will be called by, so here !ping will call this command
    name : "ping",
    // If the command can be used by only moderators or not
    modOnly : false;

    // Now we will write the bit that will actually execute the code
    execute(client, channel, userstate, message, self, commandArgs) {
        // Now we will simply tell the bot to send a message
        client.say(channel, "Pong!");
    }
    // Congrats you just made a command!
}
```
# Event Files
Events are ran by file name. this is in order to prevent mutiple files with the same events.
```js
module.exports = {
    // As the paramaters we support all the params in our Event Paramaters Section
    execute(channel, username, userstate) {
        // Now we will write a simple message out saying who was banned!
        client.say(channel, `${username} Was Banned!`)
    }
    // Congrats you just made a event
}
```
# Command Paramaters
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
    - messag,
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