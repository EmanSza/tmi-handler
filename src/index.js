const fs = require('fs');
const path = require('path');

class twitchWrapper {
    constructor(tmiClient, {
        debug,
        reconnect,
        channels,
        username,
        password,
        filePath,
    }) {
        // tmi Options
        this.tmiClient = tmiClient || require('tmi.js');
        this.debug = debug || false;
        this.reconnect = reconnect || false
        this.channels = channels || null;
        this.username = username || null
        this.password = password || null
        this.filePath = filePath || null

        // Check Options
        if(typeof this.debug !== "boolean") throw new Error('Debug must be a boolean || Defaults to false')
        if(typeof this.reconnect !== "boolean") throw new Error('Reconnect must be a boolean || Defaults to false')
        if(!Array.isArray(this.channels)) throw new Error('Channels must be an array of strings')
        if(this.channels.isArray()) {
            for(let i = 0; i < this.channels.length; i++) {
                    if(typeof this.channels[i] !== "string") throw new Error(`Channel Array: ${i} must be a string`)
            }
        }
        if(typeof this.username !== "string") throw new Error('Username must be a string')
        if(typeof this.password !== "string") throw new Error('Password must be a string')
        if(typeof this.filePath !== "string") throw new Error('FilePath must be a string')

        this.client = this.connect()

        let commands = []
        executeFiles(this.filePath, commands)
        this.client('message', (channel, tags, message, self, commands) => {
            if(self) return;
            if(!this.channels.includes(channel)) return;
            for(let i = 0; i < commands.length; i++) {
                if(message.toLowerCase().startsWith(commands[i].name)) {
                    let files = fs.readdirSync(path.join(process.cwd()) + filePath, { withFileTypes: true })
                    for(let i = 0; i < files.length; i++) {
                            let file = require(path.join(process.cwd()) + filePath + files[i].name)
                            if(!file.modOnly || tags.mod) {
                                file.execute()
                            }
                    }
                }
            }
            
        })
    }
    
    connect() {
        const client = new this.tmiClient({
            options: {
                debug: this.debug
            },
            identity: {
                username: this.username,
                password: this.password
            },
            connection: {
                reconnect: this.reconnect
            },

        })
        return client
    }

}
async function executeFiles(filePath, commands) {
    let files = fs.readdirSync(path.join(process.cwd()) + filePath, { withFileTypes: true })
    
    for (const file of files) {
        let  fileDetails = require(path.join(process.cwd()) + filePath + file.name)
        if(!file.name.endsWith('.js') && !file.isFile()) return;
        let commandName = fileDetails.name
        if(!fileDetails.name) {
             commandName = file.name.split('.')[0]
             console.warn(`No name found in file: ${file.name} Defaulting to ${commandName}`)
        }
        let commandName = {
            name: commandName.toLowerCase(),
            fileName: file.name,
            modOnly: fileDetails.modOnly || false,
        }
        commands.push(commandName)
    }
}

module.exports = twitchWrapper;