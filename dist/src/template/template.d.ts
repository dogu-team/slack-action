export type SlackOption = {
    channel: string;
    fail: boolean;
};
export type Template = (option: SlackOption) => Promise<void>;
export declare const templates: {
    [name: string]: Template;
};
//# sourceMappingURL=template.d.ts.map