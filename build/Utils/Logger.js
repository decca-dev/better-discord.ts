import chalk from "chalk";
export class Logger {
    constructor(src) {
        this.src = src.toUpperCase();
    }
    info(message) {
        console.log(`[${this.formatDate(new Date())}] (${chalk.bold(this.src)}) ${chalk.green("INFO")} - ${message}`);
    }
    error(error) {
        let message = typeof error === "string" ? error : error.message;
        console.log(`[${this.formatDate(new Date())}] (${chalk.bold(this.src)}) ${chalk.red("ERROR")} - ${message}`);
    }
    warn(message) {
        console.log(`[${this.formatDate(new Date())}] (${chalk.bold(this.src)}) ${chalk.yellow("WARN")} - ${message}`);
    }
    formatDate(date) {
        const hours = date.getHours().toString().padEnd(2, "0");
        const minutes = date.getMinutes().toString().padEnd(2, "0");
        const seconds = date.getSeconds().toString().padEnd(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }
}
//# sourceMappingURL=Logger.js.map