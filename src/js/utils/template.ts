import { map } from '../libs/index';
import itemButtonsTemplate from '../templates/itemButtons';

const getStationsItemTemplate = (
  station: string
): string => `<li class="station-list-item d-flex items-center py-2">
<span class="w-100 pl-2">${station}</span>
${itemButtonsTemplate}
</li>
<hr class="my-0" />`;

export const createListTemplate =
  (createTemplate: (item: string) => string) =>
  (list: string[]): string =>
    map(list, createTemplate).join('');

export const createOptionsTemplate = createListTemplate(
  (item: string): string => `<option>${item}</option>`
);

export const createStationsItemTemplate = createListTemplate(
  getStationsItemTemplate
);
