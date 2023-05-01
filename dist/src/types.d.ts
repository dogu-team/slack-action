declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SLACK_BOT_TOKEN: string;
        }
    }
}
export declare enum ResultStatus {
    SUCCESS = "success",
    FAILURE = "failure",
    CANCELLED = "cancelled",
    SKIPPED = "skipped"
}
//# sourceMappingURL=types.d.ts.map