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
    clientID: "832971552114737182",
    commandsPath: join(__dirname, "Commands"),
});
registerer.register();
const client = new TSClient({ intents: [Intents.FLAGS.GUILDS] });
client.init();
//# sourceMappingURL=index.js.map