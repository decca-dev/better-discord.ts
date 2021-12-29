import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandRegistererInterface } from "../typings";
export declare class CommandRegisterer {
    readonly clientID: string;
    commands: RESTPostAPIApplicationCommandsJSONBody[];
    commandsPath: string;
    constructor(options: CommandRegistererInterface);
    register(): void;
}
