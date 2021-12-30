import { TSClient } from "./Structures/Client.js";
import { CommandRegisterer } from "./Utils/RegisterCommands.js";
import { Intents } from "discord.js";
import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerer = new CommandRegisterer({
  clientID: process.env.CLIENT_ID,
  commandsPath: join(__dirname, "Commands"),
});
await registerer.register();
export const client = new TSClient({ intents: [Intents.FLAGS.GUILDS] });
client.init();
