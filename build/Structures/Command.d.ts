import { CommandInterface } from "../typings";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
export declare class Command {
    data: SlashCommandBuilder;
    cooldown?: number;
    run: (interaction: CommandInteraction) => void;
    constructor(options: CommandInterface);
}
