import { cd } from './cd';
import { ci } from './ci';

export type SlackOption = { channel: string };
export type Template = (option: SlackOption) => Promise<void>;

export const templates: { [name: string]: Template } = {
  cd,
  ci,
};
