import { map } from '../libs/index';
import { LinesFormData } from '../types/index';
import itemButtonsTemplate from '../templates/itemButtons';

const stationsItemTemplate = (
  station: string
): string => `<li class="station-list-item d-flex items-center py-2">
<span class="w-100 pl-2 station-name">${station}</span>
${itemButtonsTemplate}
</li>
<hr class="my-0" />`;

const linesItemTemplate = (
  linesData: LinesFormData
): string => `<li class="d-flex items-center py-2 relative">
<span class="subway-line-color-dot bg-${linesData.color}"></span>
<span class="w-100 pl-6 subway-line-list-item-name"
  >${linesData.lineName}</span
>
${itemButtonsTemplate}
</li>
<hr class="my-0" />`;

export const createListTemplate =
  <Item>(createTemplate: (item: Item) => string) =>
  (list: Item[]): string =>
    map(list, createTemplate).join('');

export const createOptionsTemplate = createListTemplate(
  (item: string): string => `<option>${item}</option>`
);

export const createStationsItemTemplate =
  createListTemplate(stationsItemTemplate);

export const createSubwayLineColorOptionsTemplate = (list: string[]): string =>
  map(list, (item, index) => {
    const hasNewLine = ((index as number) + 1) % 7 === 0;
    return `<button type="button" class="color-option bg-${item}"></button> ${
      hasNewLine ? '<br/>' : ''
    }`;
  }).join('');

export const createLinesItemTemplate = createListTemplate(linesItemTemplate);
