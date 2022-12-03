import { WebClient } from "@slack/web-api";

export module Slack {
  export let web: WebClient;

  export function init(token: string) {
    web = new WebClient(token)
  }
}