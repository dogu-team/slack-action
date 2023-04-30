import { ResultStatus } from '../types';
export type TemplateOption = {
    channel: string;
    resultStatus: ResultStatus;
};
export type Template = (option: TemplateOption) => Promise<void>;
export declare const templates: {
    [name: string]: Template;
};
//# sourceMappingURL=template.d.ts.map