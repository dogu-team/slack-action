import { e2e } from "./e2e";

export type SlackOption = {channel: string};
export type Template = (option: SlackOption) => Promise<void>;

export const templates: {[name: string]: Template} = {
  e2e,
}