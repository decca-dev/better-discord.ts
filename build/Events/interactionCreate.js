import { Event } from "../Structures/Event.js";
import { Logger } from "../Utils/Logger.js";
const logger = new Logger("ready");
export const event = new Event({
    name: "interactionCreate",
    run: async (client, interaction) => {
        if (!interaction.isCommand)
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            await command.run(interaction);
        }
        catch (error) {
            logger.error(error);
            await interaction.reply({
                content: `**An error occured**:\n\`\`\`${error?.message}\`\`\``,
            });
        }
    },
});
//# sourceMappingURL=interactionCreate.js.map