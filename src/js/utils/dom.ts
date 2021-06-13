export const $ = (
  selector: string,
  target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

export const closest = (target: HTMLElement, selector: string): HTMLElement =>
  target.closest(selector) as HTMLElement;

export const newElement = (element: string): HTMLElement => {
  const template = document.createElement("template");
  template.innerHTML = element;
  return template.content.children[0] as HTMLElement;
};
