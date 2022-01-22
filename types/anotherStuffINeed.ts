import { RecordToEntries } from "./shitINeed";
import tmi from "tmi.js";

export type DiscriminatedUnion<M extends Record<string, unknown>> = DiscriminatedUnionForRealsies<RecordToEntries<M>>;

type DiscriminatedUnionForRealsies<E, R = never> = E extends [infer Entry, ...infer Rest]
    ? Entry extends [infer Key, infer Args]
        ? //@ts-ignore unfortunately required for this line to my knowledge... coworkers can fix this easily tho
          DiscriminatedUnionForRealsies<Rest, R | { event: Key; execute: (...args: Args) => void }>
        : DiscriminatedUnionForRealsies<Rest, R>
    : R;

type TMIEvents = {
    action: [client: tmi.Client, channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean];
    anongiftpaidupgrade: [client: tmi.Client, channel: string, username: string, userstate: tmi.AnonSubGiftUpgradeUserstate];
    anonsubmysterygift: [
        client: tmi.Client,
        channel: string,
        numbOfSubs: number,
        methods: tmi.SubMethods,
        userstate: tmi.AnonSubMysteryGiftUserstate
    ];
    anonsubgift: [
        client: tmi.Client,
        channel: string,
        streakMonths: number,
        recipient: string,
        methods: tmi.SubMethods,
        userstate: tmi.AnonSubGiftUserstate
    ];
    automod: [client: tmi.Client, channel: string, msgID: "msg_rejected" | "msg_rejected_mandatory", message: string];
    ban: [client: tmi.Client, channel: string, username: string, reason: string];
    chat: [client: tmi.Client, channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean];
    cheer: [client: tmi.Client, channel: string, userstate: tmi.ChatUserstate, message: string];
    clearchat: [client: tmi.Client, channel: string];
    connected: [client: tmi.Client, address: string, port: number];
    connecting: [client: tmi.Client, address: string, port: number];
    disconnected: [client: tmi.Client, reason: string];
    emoteonly: [client: tmi.Client, channel: string, enabled: boolean];
    emotesets: [client: tmi.Client, sets: string, obj: tmi.EmoteObj];
    followersonly: [client: tmi.Client, channel: string, enabled: boolean, length: number];
    giftpaidupgrade: [client: tmi.Client, channel: string, username: string, sender: string, userstate: tmi.SubGiftUpgradeUserstate];
    hosted: [client: tmi.Client, channel: string, username: string, viewers: number, autohost: boolean];
    hosting: [client: tmi.Client, channel: string, target: string, viewers: number];
    join: [client: tmi.Client, channel: string, username: string, self: boolean];
    logon: [client: tmi.Client];
    message: [client: tmi.Client, channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean];
};

type TMIEvents2 = {
    messagedeleted: [client: tmi.Client, channel: string, username: string, deletedMessage: string, userstate: tmi.DeleteUserstate];
    mod: [client: tmi.Client, channel: string, username: string];
    mods: [client: tmi.Client, channel: string, mods: string[]];
    notice: [client: tmi.Client, channel: string, msgid: tmi.MsgID, message: string];
    part: [client: tmi.Client, channel: string, username: string, self: boolean];
    ping: [client: tmi.Client];
    pong: [client: tmi.Client, latency: number];
    primepaidupgrade: [
        client: tmi.Client,
        channel: string,
        username: string,
        methods: tmi.SubMethods,
        userstate: tmi.PrimeUpgradeUserstate
    ];
    r9kbeta: [client: tmi.Client, channel: string, enabled: boolean];
    raided: [cclient: tmi.Client, hannel: string, username: string, viewers: number];
    raw_message: [client: tmi.Client, messageCloned: { [property: string]: any }, message: { [property: string]: any }];
    reconnect: [client: tmi.Client];
    // additional string literals for autocomplete
    redeem: [
        client: tmi.Client,
        channel: string,
        username: string,
        rewardType: "highlighted-message" | "skip-subs-mode-message" | string,
        tags: tmi.ChatUserstate
    ];
    resub: [
        client: tmi.Client,
        channel: string,
        username: string,
        months: number,
        message: string,
        userstate: tmi.SubUserstate,
        methods: tmi.SubMethods
    ];
    roomstate: [client: tmi.Client, channel: string, state: tmi.RoomState];
};

type TMIEvents3 = {
    serverchange: [client: tmi.Client, channel: string];
    slowmode: [client: tmi.Client, channel: string, enabled: boolean, length: number];
    subgift: [
        client: tmi.Client,
        channel: string,
        username: string,
        streakMonths: number,
        recipient: string,
        methods: tmi.SubMethods,
        userstate: tmi.SubGiftUserstate
    ];
    submysterygift: [
        client: tmi.Client,
        channel: string,
        username: string,
        numbOfSubs: number,
        methods: tmi.SubMethods,
        userstate: tmi.SubMysteryGiftUserstate
    ];
    subscribers: [client: tmi.Client, channel: string, enabled: boolean];
    subscription: [
        client: tmi.Client,
        channel: string,
        username: string,
        methods: tmi.SubMethods,
        message: string,
        userstate: tmi.SubUserstate
    ];
    timeout: [client: tmi.Client, channel: string, username: string, reason: string, duration: number];
    unhost: [client: tmi.Client, channel: string, viewers: number];
    unmod: [client: tmi.Client, channel: string, username: string];
    vips: [client: tmi.Client, channel: string, vips: string[]];
    whisper: [client: tmi.Client, from: string, userstate: tmi.ChatUserstate, message: string, self: boolean];
};

export type TmiClientEvent = DiscriminatedUnion<TMIEvents> | DiscriminatedUnion<TMIEvents2> | DiscriminatedUnion<TMIEvents3>;
