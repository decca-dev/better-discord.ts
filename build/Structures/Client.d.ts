import { Client, Collection } from "discord.js";
import { Command } from "./Command.js";
import { Event } from "./Event.js";
export declare class TSClient extends Client {
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    cooldown: Collection<string, number>;
    init(): void;
}
