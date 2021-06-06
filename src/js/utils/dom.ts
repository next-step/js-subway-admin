const $ = (
  selector: string,
  targetNode: Document | HTMLElement = document
): HTMLElement => targetNode.querySelector(selector) as HTMLElement;

export default $;
