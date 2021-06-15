const render =
  (node: HTMLElement) =>
  (template: string | (() => string)): void => {
    node.innerHTML = typeof template === 'string' ? template : template();
  };

export default render;
