import tmi, { Client, Events } from "tmi.js";

export default class TwitchWrapper {
    /**
     * @constructor Main class for Wrapper
     *
     *
     * @param {TwitchWrapperOptions} options Options for the Wrapper
     */
    public constructor(options: TwitchWrapperOptions);

    /** @function Loads all commands. Default directory is /commands */
    public loadCommands(commandPath?: string): Promise<this>;

    /** @function Loads all events. Default directory is /events */
    public loadEvents(eventPath?: string): Promise<this>;

    /** @function Same as `loadCommands` but synchronous */
    public loadCommandsSync(commandPath?: string): this;

    /** @function Same as `loadEvents` but synchronous */
    public loadEventsSync(commandPath?: string): this;
}


export declare interface TwitchWrapperOptions {
    /** Username of the bot you will use to connect to Twitch*/
    username: string;

    /** Password used to connect to the bot via Twitch */
    password: string;

    /** Channels the bot will join upon connection */
    channels: string[];

    /** Prefix of the bot commands
     * @defaultvalue "!"
     */
    prefix?: string;

    /** Enables or disables tmi.js debugging
     * @defaultvalue false
     */
    debug?: boolean;

    /** Enables or disables sensitive information (Username and Password) in debugging
     * @defaultvalue false
     */
    contentCreator?: boolean;

    /** Enables or disables tmi.js reconnect
     * @defaultvalue false
     */
    reconnect?: boolean;

    /** Whether the bot should respond to itself
     * @defaultvalue true
     */
    selfDetection?: boolean;

    /** Whether your code is written is TypeScript instead of JavaScript
     * @defaultvalue false
     */
    typeScript?: boolean;

    /** Global cooldown value in millisenconds */
    globalCooldown?: number | null;

    /**  @deprecated Use the [.loadCommands()](https://www.npmjs.com/package/tmi-handler) class method instead */
    commandPath?: never;

    /** @deprecated Use the [.loadEvents()](https://www.npmjs.com/package/tmi-handler) class method instead */
    eventPath?: never;

}

export declare interface TmiInstanceMethods {
    /** @function Returns all loaded commands, or an empty array if none */
    getLoadedCommands(): TmiCommand[];

    /** @function Returns all loaded events, or an empty array if none */
    getLoadedEvents(): TmiEvent[];

    /** @function Returns current default prefix */
    getDefaultPrefix(): string;

    /** @function Reload commands from the commands directory
     * @returns {TmiCommand[]} The reloaded commands
    */
    reloadCommands(): Promise<TmiCommand[]>;

    /** @function Reload events from the events directory 
     * @returns {TmiEvent[]} The reloaded events
    */
    reloadEvents(): Promise<TmiEvent[]>;

    /** Sets default prefix. 
     * @returns {string} The new prefix */
    setDefaultPrefix(newPrefix: string): string;

    /**  Terminates the connection to Twitch and reconnect again 
     * @returns {void}
    */
    reLogin(): Promise<void>
}

export declare interface TmiCommandParameters {
    /** The client */
    client: tmi.Client,
    /** The channel that message was sent in */
    channel: string,
    /** The user userstate */
    userstate: tmi.Userstate,
    /** The message content */
    message: string,
    /** Whether the message was sent by the bot */
    self: boolean,
    /** The arguments for the command */
    args: string[],
    /** Class methods to use inside a command file */
    instance: TmiInstanceMethods;
}
export declare type TmiCommand = {
    /** Name of the command
     * ```js
     * name: "ping" // command will be called as !ping
     * ```
     */
    name: string;

    /** Whether the command is moderator only */
    modOnly?: boolean;

    /** Command cooldown is milliseconds*/
    cooldown?: number;

    /** The function to run when command is called */
    execute(args: TmiCommandParameters): void | Promise<void>
}

export declare type Awaitable<T> = Promise<T> | T;

export declare type MappedEvents = {
    [K in keyof Events]: { event: K, execute: (...args: Parameters<Events[K]>) => Awaitable<void> }
}

export declare type TmiEvent = MappedEvents[keyof MappedEvents];