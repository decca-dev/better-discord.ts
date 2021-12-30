import { CommandInterface } from "../typings";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { PermissionString } from "discord.js";

export class Command {
  public data: SlashCommandBuilder;
  public permissions?: PermissionString[] = [];
  public ownerOnly: boolean;
  public run: (interaction: CommandInteraction) => void;

  constructor(options: CommandInterface) {
    this.data = options.data;
    this.permissions = options.permissions;
    this.ownerOnly = options.ownerOnly;
    this.run = options.run;
  }
}
