declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_BOT_TOKEN: string;
    }
  }
}

export {};
