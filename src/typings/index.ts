import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, ClientEvents, PermissionString } from "discord.js";

export interface CommandInterface {
  data: SlashCommandBuilder;
  permissions?: PermissionString[];
  ownerOnly: boolean;
  run: (interaction: CommandInteraction) => void;
}

export interface CommandRegistererInterface {
  clientID: string;
  commandsPath: string;
}

export interface EventInterface {
  name: keyof ClientEvents;
  run: (...args: any[]) => void;
}
