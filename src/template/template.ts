import { CI } from './ci';
import { CD } from './cd';

export type SlackOption = { channel: string; isFail: boolean };
export type Template = (option: SlackOption) => Promise<void>;

export const templates: { [name: string]: Template } = {
  CI,
  CD,
};
