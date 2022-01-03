module.exports = class eventReturner {
    constructor(tmi, client, events, selfDetection, cLog) {
        this.tmi = tmi;
        this.client = client;
        this.events = events;
        this.selfDetection = selfDetection;
        this.cLog = cLog;
        this.eventName = undefined;
        this.paramaters = undefined;

        this.client.on('action', (channel, userstate, nessage, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'action';
            // Wrap the paramaters in an object
            this.paramaters = {channel, userstate, nessage, self};
            this.event();
        });
        this.client.on('anongiftpaidupgrade', (channel, username, userstate ) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'anongiftpaidupgrade';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, userstate};
            this.event();
        });
        this.client.on('ban', (channel, username, reason, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'ban';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, reason, userstate};
            this.event();
        });
        this.client.on('chat', (channel, userstate, message, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'chat';
            // Wrap the paramaters in an object
            this.paramaters = {channel, userstate, message, self};
            this.event();
        });
        this.client.on('cheer', (channel, userstate, message) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'cheer';
            // Wrap the paramaters in an object
            this.paramaters = {channel, userstate, message};
            this.event();
        });
        this.client.on('clearchat', (channel) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'clearchat';
            // Wrap the paramaters in an object
            this.paramaters = {channel};
            this.event();
        });
        this.client.on('connected', (address, port) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'connected';
            // Wrap the paramaters in an object
            this.paramaters = {address, port};
            this.event();
        });
        this.client.on('connecting', (address, port) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'connecting';
            // Wrap the paramaters in an object
            this.paramaters = {address, port};
            this.event();
        });
        this.client.on('disconnected', (reason) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'disconnected';
            // Wrap the paramaters in an object
            this.paramaters = {reason};
            this.event();
        });
        this.client.on('emoteonly', (channel, enabled) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'emoteonly';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled};
            this.event();
        });
        this.client.on('emotesets', (channel, enabled) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'emotesets';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled};
            this.event();
        });
        this.client.on('followersonly', (channel, enabled, length) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'followersonly';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled, length};
            this.event();
        });
        this.client.on('hosted', (channel, username, viewers, autohost) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'hosted';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, viewers, autohost};
            this.event();
        });
        this.client.on('hosting', (channel, target, viewers) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'hosting';
            // Wrap the paramaters in an object
            this.paramaters = {channel, target, viewers};
            this.event();
        });
        this.client.on('join', (channel, username, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'join';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, self};
            this.event();
        });
        this.client.on('logon', () => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'logon';
            // Wrap the paramaters in an object
            this.paramaters = {};
            this.event();
        });
        this.client.on('message', (channel, userstate, message, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'message';
            // Wrap the paramaters in an object
            this.paramaters = {channel, userstate, message, self};
            this.event();
        });
        this.client.on('messagedeleted', (channel, username, deletedMessage, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'messagedeleted';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, deletedMessage, self};
            this.event();
            });
        this.client.on('mod', (channel, username) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'mod';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username};
            this.event();
        });
        this.client.on('mods', (channel, mods) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'mods';
            // Wrap the paramaters in an object
            this.paramaters = {channel, mods};
            this.event();
        });
        this.client.on('notice', (channel, msgid, message) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'notice';
            // Wrap the paramaters in an object
            this.paramaters = {channel, message, userstate};
            this.event();
        });
        this.client.on('part', (channel, username, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'part';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, self};
            this.event();
        });
        this.client.on('ping', (latency) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'ping';
            // Wrap the paramaters in an object
            this.paramaters = {latency};
            this.event();
        });
        this.client.on('pong', (latency) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'pong';
            // Wrap the paramaters in an object
            this.paramaters = {latency};
            this.event();
        });
        this.client.on('r9kbeta', (channel, enabled) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'r9kbeta';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled};
            this.event();
        });
        this.client.on('raided', (channel, username, viewers) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'raided';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, viewers};
            this.event();
        });
        this.client.on('raw_message', (messageCloned, message) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'raw_message';
            // Wrap the paramaters in an object
            this.paramaters = {messageCloned, message};
            this.event();
        });
        this.client.on('reconnect', (attempt, delay) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'reconnect';
            // Wrap the paramaters in an object
            this.paramaters = {attempt, delay};
            this.event();
        });
        this.client.on('resub', (channel, username, streakMonths, message, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'resub';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, streakMonths, message, userstate};
            this.event();
        });
        this.client.on('roomstate', (channel, state) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'roomstate';
            // Wrap the paramaters in an object
            this.paramaters = {channel, state};
            this.event();
        });
        this.client.on('serverchange', (channel) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'serverchange';
            // Wrap the paramaters in an object
            this.paramaters = {channel};
            this.event();
        });
        this.client.on('slowmode', (channel, enabled, length) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'slowmode';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled, length};
            this.event();
        });
        this.client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'subgift';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, streakMonths, recipient, methods, userstate};
            this.event();
        });
        this.client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'subgift';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, streakMonths, recipient, methods, userstate};
            this.event();
            });
        this.client.on('submysterygift', (channel, username, numOfSubs, methods, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'submysterygift';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, numOfSubs, methods, userstate};
            this.event();
        });
        this.client.on('subscribers', (channel, enabled) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'subscribers';
            // Wrap the paramaters in an object
            this.paramaters = {channel, enabled};
            this.event();
        });
        this.client.on('subscription', (channel, username, method, message, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'subscription';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, method, message, userstate};
            this.event();
        });
        this.client.on('timeout', (channel, username, reason, duration, userstate) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'timeout';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username, reason, duration, userstate};
            this.event();
        });
        this.client.on('unhost', (channel, viewers) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'unhost';
            // Wrap the paramaters in an object
            this.paramaters = {channel, viewers};
            this.event();
        });
        this.client.on('unmod', (channel, username) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'unmod';
            // Wrap the paramaters in an object
            this.paramaters = {channel, username};
            this.event();
        });
        this.client.on('vips', (channel, vips) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'vips';
            // Wrap the paramaters in an object
            this.paramaters = {channel, vips};
            this.event();
        });
        this.client.on('whisper', (from, userstate, messafe, self) => {
            // Call event function and pass in the event name and paramaters
            this.eventName = 'whisper';
            // Wrap the paramaters in an object
            this.paramaters = {from, userstate, messafe, self};
            this.event();
        });
        
    }
    event() {
        let data = {
            eventName: this.eventName,
            paramaters: this.paramaters
        }
        // console.log(data);
        // Now any time a event is called go thru the events array and execute the function
        // console.log(this.events)
        this.events.forEach(event => {
            // If self is a paramater check to see if its true, if it is true and selfdetection is true return nothing
           
            // if the event name and the name of the event in the array match execute the function
            if (event.name === data.eventName) {
                event.execute(data.paramaters);
            }
        });
    }
}