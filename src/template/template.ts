import { CI } from './CI';
import { CD } from './CD';

export type SlackOption = { channel: string };
export type Template = (option: SlackOption) => Promise<void>;

export const templates: { [name: string]: Template } = {
  CI,
  CD,
};
