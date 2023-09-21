declare class Template {
    constructor(_value: string);
    value: string;
    replace(re: Record<string, string>): string;
}
export declare const createTem: (_path: string) => Promise<Template>;
export {};
