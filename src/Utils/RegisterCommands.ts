import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandRegistererInterface } from "../typings";
import { Logger } from "./Logger.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Command } from "../Structures/Command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = new Logger("Register Commands");

export class CommandRegisterer {
  public readonly clientID: string;
  public commandsPath: string;

  constructor(options: CommandRegistererInterface) {
    this.clientID = options.clientID;
    this.commandsPath = options.commandsPath;
  }

  public async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  public async register(guildID?: string): Promise<void> {
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
    const rest = new REST({ version: "9" }).setToken(
      process.env.TOKEN as string
    );
    await readdirSync(this.commandsPath).forEach(async (dir) => {
      const commandFiles = readdirSync(`${this.commandsPath}/${dir}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of commandFiles) {
        const command: Command = await this.importFile(
          `file://${this.commandsPath}/${dir}/${file}`
        );
        commands.push(command.data?.toJSON());
        logger.info(`Registering ${command.data?.name}`);
      }

      if (!guildID) {
        rest
          .put(Routes.applicationCommands(this.clientID), {
            body: commands,
          })
          .then(() =>
            logger.info("Commands were registered globally with success!")
          )
          .catch((err) => logger.error(err));
      } else {
        rest
          .put(Routes.applicationGuildCommands(this.clientID, guildID!), {
            body: commands,
          })
          .then(() =>
            logger.info(
              `Commands were registered to guild ${guildID} with success!`
            )
          )
          .catch((err) => logger.error(err));
      }
    });
  }
}
