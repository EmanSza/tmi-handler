import tmi, { Client } from 'tmi.js';
import { TmiClientEvent } from './anotherStuffINeed';

export default class TwitchWrapper {
  /**
   * @constructor Main class for Wrapper
   *
   *
   * @param {object} options Options for the Wrapper
   */
  public constructor(options: {
    /** Username of the bot you will use to connect to Twitch*/
    username: string;

    /**Client object from the tmi.js package */
    client: Client;

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

    /**  @deprecated Use the [.loadCommands()](https://www.npmjs.com/package/tmi-handler) class method instead */
    commandPath?: undefined;

    /** @deprecated Use the [.loadEvents()](https://www.npmjs.com/package/tmi-handler) class method instead */
    eventPath?: undefined;
  });

  /** @function function to load the command folder */
  public loadCommands(commandPath: string): Promise<TmiCommand[]>;

  /** @function it is the function that loads all event files in a directory */
  public loadEvents(eventPath: string): Promise<TmiEvent[]>;

  private message({ channel, userstate, message, self, client }): void;
}

export type TmiCommand = {
  /** Name of the command
   * ```js
   * name: "ping" // command will be called as !ping
   * ```
   */
  name: string;

  /** Whether the command is moderator only */
  modOnly: boolean;

  execute(
    client: tmi.Client,
    channel: string,
    userstate: tmi.Userstate,
    message: string,
    self: boolean,
    commandArgs: string[]
  ): void | Promise<void>;
};

// HUGE thanks to iPhoneXVII#9257 for helping me getting this to work

export type TmiEvent = TmiClientEvent;
