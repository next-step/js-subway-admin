export const $ = (
  selector: string,
  node: HTMLElement | Document = document
): HTMLElement => node.querySelector(selector) as HTMLElement;

export const $$ = (selector: string, node = document): NodeList =>
  node.querySelectorAll(selector) as NodeList;

export const $closest = (selector: string, node: HTMLElement): HTMLElement =>
  node.closest(selector) as HTMLElement;
