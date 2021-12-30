import { Event } from "../Structures/Event.js";
import { CommandInteraction } from "discord.js";
import { Logger } from "../Utils/Logger.js";
import { client } from "../index.js";

const logger = new Logger("ready");

export default new Event({
  name: "interactionCreate",
  run: async (interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction);
    } catch (error: any) {
      logger.error(error);
      await interaction.reply({
        content: `**An error occured**:\n\`\`\`${error?.message}\`\`\``,
      });
    }
  },
});
