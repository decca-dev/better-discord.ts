import { Command } from "../../Structures/Command.js";
import { SlashCommandBuilder } from "@discordjs/builders";
export const command = new Command({
    data: new SlashCommandBuilder()
        .setName("lol")
        .setDescription("Shows the bot's response time"),
    cooldown: 3,
    run: async (interaction) => {
        await interaction.reply("lmao");
    },
});
//# sourceMappingURL=Lol.js.map