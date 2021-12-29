import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandRegistererInterface } from "../typings";
import { Logger } from "./Logger.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = new Logger("Register Commands");

export class CommandRegisterer {
  public readonly clientID: string;
  public commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  public commandsPath: string;

  constructor(options: CommandRegistererInterface) {
    this.clientID = options.clientID;
    this.commandsPath = options.commandsPath;
    readdirSync(this.commandsPath).forEach(async (dir) => {
      const commandFiles = readdirSync(`${this.commandsPath}/${dir}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of commandFiles) {
        const { command } = await import(
          `file://${this.commandsPath}/${dir}/${file}`
        );
        this.commands.push(command.data?.toJSON());
        logger.info(`Registering ${command.data?.name}`);
      }
    });
  }

  public register(guildID?: string, globally = true): void {
    const rest = new REST({ version: "9" }).setToken(
      process.env.TOKEN as string
    );

    if (globally) {
      rest
        .put(Routes.applicationCommands(this.clientID), {
          body: this.commands,
        })
        .then(() =>
          logger.info("Commands were registered globally with success!")
        )
        .catch((err) => logger.error(err));
    } else {
      rest
        .put(Routes.applicationGuildCommands(this.clientID, guildID!), {
          body: this.commands,
        })
        .then(() =>
          logger.info(
            `Commands were registered to guild ${guildID} with success!`
          )
        )
        .catch((err) => logger.error(err));
    }
  }
}
