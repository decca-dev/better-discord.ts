import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, ClientEvents } from "discord.js";
import { TSClient } from "../Structures/Client";

export interface CommandInterface {
  data: SlashCommandBuilder;
  cooldown?: number;
  run: (interaction: CommandInteraction) => void;
}

export interface CommandRegistererInterface {
  clientID: string;
  commandsPath: string;
}

export interface EventInterface {
  name: keyof ClientEvents;
  run: (client: TSClient, ...args: any[]) => void;
}
