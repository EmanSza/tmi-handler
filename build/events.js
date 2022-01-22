function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
module.exports = class eventReturner {
    event() {
        let data = {
            eventName: this.eventName,
            paramaters: this.paramaters
        };
        data.paramaters.unshift(this.client);
        // Now any time a event is called go thru the events array and execute the function
        // console.log(this.events);
        this.events.forEach((event)=>{
            // If self is a paramater check to see if its true, if it is true and selfdetection is true return nothing
            // if the event name and the name of the event in the array match execute the function
            if (event.eventName === data.eventName) {
                event.execute(...data.paramaters);
            }
        });
    }
    constructor(client, events, selfDetection, cLog){
        this.client = client;
        this.events = events;
        this.selfDetection = selfDetection;
        this.cLog = cLog;
        this.eventName = undefined;
        this.paramaters = undefined;
        var _this = this;
        _asyncToGenerator(function*() {
            _this.client.on('action', (channel, userstate, nessage, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'action';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    userstate,
                    nessage,
                    self
                ];
                _this.event();
            });
            _this.client.on('anongiftpaidupgrade', (channel, username, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'anongiftpaidupgrade';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('ban', (channel, username, reason, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'ban';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    reason,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('chat', (channel, userstate, message, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'chat';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    userstate,
                    message,
                    self
                ];
                _this.event();
            });
            _this.client.on('cheer', (channel, userstate, message)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'cheer';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    userstate,
                    message
                ];
                _this.event();
            });
            _this.client.on('clearchat', (channel)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'clearchat';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel
                ];
                _this.event();
            });
            _this.client.on('connected', (address, port)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'connected';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    address,
                    port
                ];
                _this.event();
            });
            _this.client.on('connecting', (address, port)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'connecting';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    address,
                    port
                ];
                _this.event();
            });
            _this.client.on('disconnected', (reason)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'disconnected';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    reason
                ];
                _this.event();
            });
            _this.client.on('emoteonly', (channel, enabled)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'emoteonly';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled
                ];
                _this.event();
            });
            _this.client.on('emotesets', (channel, enabled)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'emotesets';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled
                ];
                _this.event();
            });
            _this.client.on('followersonly', (channel, enabled, length)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'followersonly';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled,
                    length
                ];
                _this.event();
            });
            _this.client.on('hosted', (channel, username, viewers, autohost)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'hosted';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    viewers,
                    autohost
                ];
                _this.event();
            });
            _this.client.on('hosting', (channel, target, viewers)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'hosting';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    target,
                    viewers
                ];
                _this.event();
            });
            _this.client.on('join', (channel, username, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'join';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    self
                ];
                _this.event();
            });
            _this.client.on('logon', ()=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'logon';
                // Wrap the paramaters in an object
                _this.paramaters = [];
                _this.event();
            });
            _this.client.on('message', (channel, userstate, message, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'message';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    userstate,
                    message,
                    self
                ];
                _this.event();
            });
            _this.client.on('messagedeleted', (channel, username, deletedMessage, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'messagedeleted';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    deletedMessage,
                    self
                ];
                _this.event();
            });
            _this.client.on('mod', (channel, username)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'mod';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username
                ];
                _this.event();
            });
            _this.client.on('mods', (channel, mods)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'mods';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    mods
                ];
                _this.event();
            });
            _this.client.on('notice', (channel, msgid, message)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'notice';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    message,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('part', (channel, username, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'part';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    self
                ];
                _this.event();
            });
            _this.client.on('ping', (latency)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'ping';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    latency
                ];
                _this.event();
            });
            _this.client.on('pong', (latency)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'pong';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    latency
                ];
                _this.event();
            });
            _this.client.on('r9kbeta', (channel, enabled)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'r9kbeta';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled
                ];
                _this.event();
            });
            _this.client.on('raided', (channel, username, viewers)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'raided';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    viewers
                ];
                _this.event();
            });
            _this.client.on('raw_message', (messageCloned, message)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'raw_message';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    messageCloned,
                    message
                ];
                _this.event();
            });
            _this.client.on('reconnect', (attempt, delay)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'reconnect';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    attempt,
                    delay
                ];
                _this.event();
            });
            _this.client.on('resub', (channel, username, streakMonths, message, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'resub';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    streakMonths,
                    message,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('roomstate', (channel, state)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'roomstate';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    state
                ];
                _this.event();
            });
            _this.client.on('serverchange', (channel)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'serverchange';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel
                ];
                _this.event();
            });
            _this.client.on('slowmode', (channel, enabled, length)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'slowmode';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled,
                    length
                ];
                _this.event();
            });
            _this.client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'subgift';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    streakMonths,
                    recipient,
                    methods,
                    userstate, 
                ];
                _this.event();
            });
            _this.client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'subgift';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    streakMonths,
                    recipient,
                    methods,
                    userstate, 
                ];
                _this.event();
            });
            _this.client.on('submysterygift', (channel, username, numOfSubs, methods, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'submysterygift';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    numOfSubs,
                    methods,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('subscribers', (channel, enabled)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'subscribers';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    enabled
                ];
                _this.event();
            });
            _this.client.on('subscription', (channel, username, method, message, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'subscription';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    method,
                    message,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('timeout', (channel, username, reason, duration, userstate)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'timeout';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username,
                    reason,
                    duration,
                    userstate
                ];
                _this.event();
            });
            _this.client.on('unhost', (channel, viewers)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'unhost';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    viewers
                ];
                _this.event();
            });
            _this.client.on('unmod', (channel, username)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'unmod';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    username
                ];
                _this.event();
            });
            _this.client.on('vips', (channel, vips)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'vips';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    channel,
                    vips
                ];
                _this.event();
            });
            _this.client.on('whisper', (from, userstate, messafe, self)=>{
                // Call event function and pass in the event name and paramaters
                _this.eventName = 'whisper';
                // Wrap the paramaters in an object
                _this.paramaters = [
                    from,
                    userstate,
                    messafe,
                    self
                ];
                _this.event();
            });
        })();
    }
};
