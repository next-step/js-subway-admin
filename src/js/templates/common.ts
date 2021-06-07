export const optionTemplate = (item: string): string =>
  `<option>${item}</option>`;

export const createListTemplate = (
  list: string[],
  template: (item: string) => string
): string => list.map((item: string) => template(item)).join('');
