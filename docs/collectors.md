## Collector Documention
 Total Collectors :

* Message Collector


## Collectors


#### Message Collectors

messageCollector is a class so when using it make sure to call new.
messageCollector returns a promise based resloved object that carrays 3 paramaters in a object

`` Return Value `` 
```js
 {
    channel : 'channelName',
    userstate : {
        // Twitches Userstate
    },
    message: 'message content'
 }
 ```
 Example:
    ```js
const { messageCollector } = require('tmi-handler');

const listener = new messageCollector();
// Set a username that you wait to wait for
    .setUser('emansza')
    // Set a Keyword you are waiting for ex: accept from the user
    .setKey('accept')
    // How Long you want to wait in seconds
    .setTime(5);
// Now listener will return a object since we use tmi.js message listener as a base
// listener = {
//    channel : channelName
//    userstate : userState
//    message : messageContents
//}
