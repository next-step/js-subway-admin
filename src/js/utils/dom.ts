export const $ = (
  selector: string,
  target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

export const $$ = (
  selector: string,
  target: Document | HTMLElement = document
): NodeListOf<HTMLElement> => target.querySelectorAll(selector);

export const closest = (target: HTMLElement, selector: string): HTMLElement =>
  target.closest(selector) as HTMLElement;

interface IElement {
  tag: string;
  className?: string;
  id?: string;
}
export const createElement = (args: IElement): HTMLElement => {
  const { tag, className = "", id = "" } = args;
  const element = document.createElement(tag);
  element.className = className;
  element.id = id;
  return element;
};
