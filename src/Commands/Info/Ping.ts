import { Command } from "../../Structures/Command.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's response time."),
  ownerOnly: true,
  run: async (interaction: CommandInteraction) => {
    await interaction.reply(
      `:ping_pong: Pong! ${interaction.client.ws.ping} ms`
    );
  },
});
