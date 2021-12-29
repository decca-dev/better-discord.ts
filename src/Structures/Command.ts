import { CommandInterface } from "../typings";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export class Command {
  public data: SlashCommandBuilder;
  public cooldown?: number;
  public run: (interaction: CommandInteraction) => void;

  constructor(options: CommandInterface) {
    this.data = options.data;
    this.cooldown = options.cooldown || 3;
    this.run = options.run;
  }
}
