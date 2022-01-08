// Call the index file so we can extend the class.
const TwitchWrapper = require('../client/client');
class MessageCollector extends  TwitchWrapper {
    constructor(tmi, client) {
        super(tmi, client);
        this.result = false
        //  Make it so we listen for a message to come in, once the message comes in we return a value
        this.listen = () => {
            return new Promise((resolve, reject) => {
                this.client.on('message', (channel, userstate, message, self) => {
                    if(self) return;
                    if(userstate.username === this.user && message.includes(this.key)) {
                        // Now return a object of values
                        this.result = {
                            channel: channel,
                            userstate: userstate,
                            message : message,
                        }
                        // from the this.time object we can see if the time has expired by subtracting the startTime from the endTime and using Date.now() and with time being in seconds
                        if(Date.now() - this.timeOb.startTime > this.timeOb.endTime) {
                            this.client.removeListener('message', this.listen);
                            client.say(channel, 'Time has expired');
                        }
                        return resolve(this.result);
                    }
                });
            })
        }
        // End Of Constructor
    }
    setUser(user) {
        if(!user) throw new Error('User is not defined');
        this.user = user;
        return this;
    }
    setKey(key) {
        if(!key) throw new Error('The key is not defined');
        this.key = key;
        return this;
    }
    setTime(time) {
        if(!time) throw new Error('The time is not defined');
        // Set the time to the time object with time being in seconds
        this.timeOb = {
            startTime: Date.now(),
            endTime: time * 1000
        }
        return this;
    }
}

module.exports = MessageCollector;