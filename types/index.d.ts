import tmi from "tmi.js";

export default class TwitchWrapper {
  /**
   * @constructor Main class for Wrapper
   *
   *
   * @param {tmi} tmi The tmi.js client
   * @param {object} options Options for the Wrapper
   */
  public constructor(
    tmi: tmi,
    options?: {
      /** Username of the bot you will use to connect to Twitch*/
      username: string;

      /** Password used to connect to the bot via Twitch */
      password: string;

      /** Channels the bot will join upon connection */
      channels: string[];

      /** Prefix of the bot commands
       * @defaultvalue "!"
       */
      prefix?: string | "!";

      /** Enables or disables tmi.js debugging
       * @defaultvalue false
       */
      debug?: boolean | false;

      /** Enables or disables sensitive information (Username and Password) in debugging
       * @defaultvalue false
       */
      contentCreator?: boolean | false;

      /** Enables or disables tmi.js reconnect
       * @defaultvalue false
       */
      reconnect?: boolean | false;

      /** Whether the bot should respond to itself
       * @defaultvalue true
       */
      selfDetection?: boolean | true;

      /**  @deprecated Use the [.loadCommands()](https://www.npmjs.com/package/tmi-handler) class method instead */
      commandPath?: undefined;

      /** @deprecated Use the [.loadEvents()](https://www.npmjs.com/package/tmi-handler) class method instead */
      eventPath?: undefined;
    }
  );

  /** @function function to load the command folder */
  public loadCommands(commandPath: string): this;

  /** @function it is the function that loads all event files in a directory */
  public loadEvents(eventPath: string): this;

  private message({ channel, userstate, message, self, client }): void;
}

export class eventReturner {
  private constructor();
}
