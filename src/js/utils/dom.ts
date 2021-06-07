export const $ = (selector: string, node = document): HTMLElement =>
  node.querySelector(selector) as HTMLElement;

export const $$ = (selector: string, node = document): NodeList =>
  node.querySelectorAll(selector) as NodeList;
