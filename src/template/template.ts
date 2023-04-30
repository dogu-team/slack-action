import { CI } from './ci';
import { CD } from './cd';
import { ResultStatus } from '../types';

export type TemplateOption = {
  channel: string;
  resultStatus: ResultStatus;
};
export type Template = (option: TemplateOption) => Promise<void>;

export const templates: { [name: string]: Template } = {
  CI,
  CD,
};
