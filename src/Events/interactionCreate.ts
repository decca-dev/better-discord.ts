import { Event } from "../Structures/Event.js";
import { CommandInteraction } from "discord.js";
import { Logger } from "../Utils/Logger.js";
import { TSClient } from "../Structures/Client.js";

const logger = new Logger("ready");

export const event = new Event({
  name: "interactionCreate",
  run: async (client: TSClient, interaction: CommandInteraction) => {
    if (!interaction.isCommand) return;

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
