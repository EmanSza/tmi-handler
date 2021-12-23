module.exports = class log {
    constructor(options) {
        this.botName = options.botName || 'Twitch Bot';
        this.colors = {
            error: '\x1b[31m',
            warn: '\x1b[33m',
            info: '\x1b[32m',
            debug: '\x1b[36m',
            reset: '\x1b[0m',
            purple: '\x1b[35m',
            green: '\x1b[32m',
            red: '\x1b[31m',
            yellow: '\x1b[33m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
            magenta: '\x1b[35m',
            blue: '\x1b[34m',
            black: '\x1b[30m'
    }
}   
    // Functions to log in the console.
    login(message) {
        if(!message) message = 'Logged In'
        // Create a new log message with the bot name being purple and bold, and the message being green and bold.
        console.log(this.colors.purple + this.botName + this.colors.green + "Logged In" + "\x1b[0m");
    }

    loaded(type, fileName) {
        if(this.fileName === null)  return console.error('File name is not defined');
        console.log(this.colors.purple + "Loaded "+ type + ": " + this.colors.green + fileName + "\x1b[0m");
    }
    totalLoaded(type, total) {
        if(this.total === null)  return console.error('Total is not defined');
        console.log(this.colors.purple + "Total " + type + " Loaded: " + this.colors.green + total + "\x1b[0m");
    }

    // End Of Class
}
