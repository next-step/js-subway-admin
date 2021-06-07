import { map } from '../libs/index';

export const createListTemplate =
  (createTemplate: (item: string) => string) =>
  (list: string[]): string =>
    map(list, createTemplate).join('');

export const createOptionsTemplate = createListTemplate(
  (item: string): string => `<option>${item}</option>`
);
