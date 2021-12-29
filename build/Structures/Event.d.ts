import { EventInterface } from "../typings";
import { TSClient } from "./Client.js";
export declare class Event {
    name: string;
    run: (client: TSClient, ...args: any[]) => void;
    constructor(options: EventInterface);
}
