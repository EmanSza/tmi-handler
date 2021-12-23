## tmi-module

This is a Light Weight Handler for TMI.js, This Module Offers the following

- Command Handling
- Event Handling
- Color Logging

Everything is custom built in this package

Stuff the Module Handles

- Login/Connection

## Getting Started
** Please Note That this package is not finished yet **

This Module is all built into a class, so we need to initialise it!
```js
// Please note that tmi is OPTIONIAL
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
[Lorem](#Lorem) 


##### Class Constructor Options

|    Options    |      Value    |     Within    |   Required    |
| ------------- | ------------- | ------------- | ------------- |
|     tmi       |   tmi Package |  Paramater    |     true     |
|   Channels    |   Array       |  Object       |     false Default to []          |
|  commandPath  |   String      |  Object       |     false  Defaults to /commands |
|   eventPath   |   String      |  Object       |     false Defaults to /events    |
|    username   |   String      |  Object       |     true     |
|   password    |   String      |  Object       |     true     |
|     debug     |   Boolean     |  Object       |     false Defaults to false      |
| contentCreator|   Boolean     |  Object       |     false Defaults to false      |
|   reconnect   |   Boolean     |  Object       |     false Defaults to false      |
| selfDetection |   Boolean     |  Object       |     false Defaults to true       |

# tmi Client
`` tmi `` - It is the 1st Paramater the constructor takes when initlaizing. the value is taken from the tmi.js Package

```js

const tmi = require('tmi.js')
const tmiModule = require('tmi-module');
const tmiModuleHandler = new tmiModule (tmi)
```

# Channels Paramater
``channels`` - It is one of the params taken from the object in the initliser. Its value is an Array

```js
const tmi = require('tmi.js')
const tmiModule = require('tmi-module');

const tmiModuleHandler = new tmiModule (tmi. {
    channels : ["Array", "Of", "Channel", "Names"]
})
```
# commandPath Paramater
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

# eventPath Paramater
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