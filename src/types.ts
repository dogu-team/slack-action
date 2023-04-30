declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_BOT_TOKEN: string;
    }
  }
}

export enum ResultStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  CANCELED = 'canceled',
  SKIPPED = 'skipped',
}
