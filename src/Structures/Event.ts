import { EventInterface } from "../typings";
import { TSClient } from "./Client.js";

export class Event {
  public name: string;
  public run: (...args: any[]) => void;

  constructor(options: EventInterface) {
    this.name = options.name;
    this.run = options.run;
  }
}
