import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import { Logger } from "./Logger.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logger = new Logger("Register Commands");
export class CommandRegisterer {
    constructor(options) {
        this.commands = [];
        this.clientID = options.clientID;
        this.commandsPath = options.commandsPath;
        readdirSync(this.commandsPath).forEach(async (dir) => {
            const commandFiles = readdirSync(`${this.commandsPath}/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const { command } = await import(`file://${this.commandsPath}/${dir}/${file}`);
                this.commands.push(command.data?.toJSON());
                logger.info(`Registering ${command.data?.name}`);
            }
        });
    }
    register( /* guildID?: string, globally = true */) {
        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
        rest
            .put(Routes.applicationCommands(this.clientID), {
            body: this.commands,
        })
            .then(() => logger.info("Commands were registered globally with success!"))
            .catch((err) => logger.error(err));
        // if (globally) {
        //   rest
        //     .put(Routes.applicationCommands(this.clientID), {
        //       body: this.commands,
        //     })
        //     .then(() =>
        //       logger.info("Commands were registered globally with success!")
        //     )
        //     .catch((err) => logger.error(err));
        // } else {
        //   rest
        //     .put(Routes.applicationGuildCommands(this.clientID, guildID!), {
        //       body: this.commands,
        //     })
        //     .then(() =>
        //       logger.info(
        //         `Commands were registered to guild ${guildID} with success!`
        //       )
        //     )
        //     .catch((err) => logger.error(err));
        // }
    }
}
//# sourceMappingURL=RegisterCommands.js.map