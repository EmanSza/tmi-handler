This is a Light Weight Handler for TMI.js, This Module Offers the following

(Its so lightweight it doesnt have any dependencys)

- Command Handling
- Event Handling
- Color Logging

Everything is custom built in this package

Stuff the Module Handles

- Login/Connection

## Getting Started

This Module is all built into a class, so we need to initialise it!
```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

// Now Let us input the options into the class
// Please note that tmi is required
const tmiModuleHandler = new tmiModule (tmi, {
    // All Options besides tmiModule are inputed within a object
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
const tmiModule = require('tmi-module');
const tmiModuleHandler = new tmiModule (tmi)
```

## Channels Paramater
``channels`` - It is one of the params taken from the object in the initliser. Its value is an Array

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    channels : ["Array", "Of", "Channel", "Names"]
})
```
## Command Path Paramater
``commandPath`` - It is the paramater that leeds to your commands folder

- commandPath will default to the root of ur folder, so if your index file is in 

 folderName/src/index.js | commandPath will default to /folderName/commands/

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    commandPath: '/src/commands/'
})
```

## Event Path Paramater
``eventPath`` - It is the paramater that leeds to your events folder

- eventPath will default to the root of ur folder, so if your index file is in 

 folderName/src/index.js | eventPath will default to /folderName/events/

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    commandPath: '/src/events/'
})
```
## Debug Paramater
``debug`` -  Enables or disables tmi.js debugging

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    debug: true
})
```
## Prefix Paramater
``prefix`` -  Enables or disables tmi.js debugging

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    prefix: "?"
})
```
## Content Creator Paramater
``contentCreator`` -  Enables or disables sensitive information (Username and Password) in debugging

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    contentCreator: true
})
```
## Reconnect Paramater
``reconnect`` -  Enables or disables tmi.js reconnect

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    reconnect: true
})
```
## Channels Paramater
``channels`` -  Channels the bot will join upon connection

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    channels: ["twitch"]
})
```
## Username Paramater
``username`` -  the name of the bot that you will use to connect to twitch

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    username: 'twitch'
})
```
## Password Paramater
``password`` -  the password used to connect to twitch via the bot

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    password: 'oauth:398b49348fdsk423'
})
```
## Self Detection Paramater
``selfDetection`` -  if you dont want the bot to respond to itself in any way

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    selfDetection: true
})
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