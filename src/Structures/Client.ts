import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { Command } from "./Command.js";
import { Event } from "./Event.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Logger } from "../Utils/Logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logger = new Logger("client");

export class TSClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public cooldown: Collection<string, number> = new Collection();

  public init(): void {
    const commandsPath = join(__dirname, "..", "Commands");
    readdirSync(commandsPath).forEach(async (dir) => {
      const commandFiles = readdirSync(`${commandsPath}/${dir}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of commandFiles) {
        const { command } = await import(
          `file://${commandsPath}/${dir}/${file}`
        );
        this.commands.set(command.data?.name, command);
        logger.info(`COMMAND - ${command.data.name}`);
      }
    });

    const eventPath = join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (file) => {
      if (file.endsWith(".js")) {
        const { event } = await import(`file://${eventPath}/${file}`);
        this.events.set(event.name, event);
        logger.info(`EVENT - ${event.name}`);
        this.on(event.name, (...args: any[]) => event.run(this, ...args));
      }
    });

    this.login(process.env.TOKEN);
  }
}
