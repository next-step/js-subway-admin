import { stations, lines } from '../dummyData';

const createMultipleTemplates = (datas: string[]) => (
  template: (data: string) => string
): string => datas.map(data => template(data)).join('');

export const createMultipleStationsTemplates = createMultipleTemplates(
  stations
);

export const createMultipleLinesTemplates = createMultipleTemplates(lines);
