import { CI } from './ci';
import { CD } from './cd';

export type SlackOption = { channel: string };
export type Template = (option: SlackOption) => Promise<void>;

export const templates: { [name: string]: Template } = {
  CI,
  CD,
};
