import { Event } from "../Structures/Event.js";
import { Logger } from "../Utils/Logger.js";
const logger = new Logger("ready");
export const event = new Event({
    name: "ready",
    run: (client) => {
        logger.info(`Logged in as ${client.user?.username}`);
        client.user?.setActivity({ type: "PLAYING", name: "with Typescript" });
    },
});
//# sourceMappingURL=ready.js.map