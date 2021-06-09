export const $ = (
  selector: string,
  targetNode: Document | HTMLElement = document
): HTMLElement => targetNode.querySelector(selector) as HTMLElement;

export const $closest = (
  selector: string,
  targetNode: HTMLElement
): HTMLElement => targetNode.closest(selector) as HTMLElement;

export const $$ = (
  selector: string,
  targetNode: Document | HTMLElement = document
): NodeList => targetNode.querySelectorAll(selector);
