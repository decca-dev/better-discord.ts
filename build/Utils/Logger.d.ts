export declare class Logger {
    readonly src: string;
    constructor(src: string);
    info(message: string): void;
    error(error: string | Error): void;
    warn(message: string): void;
    formatDate(date: Date): string;
}
