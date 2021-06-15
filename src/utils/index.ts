export function selectOne <T extends HTMLElement>(selector: string, parent: HTMLElement = document.body): T {
  return parent.querySelector(selector) as T;
}

export function selectAll <T extends HTMLElement>(selector: string, parent: HTMLElement = document.body): T[] {
  return [ ...parent.querySelectorAll(selector) ] as T[];
}

export function selectParent <T extends HTMLElement>(selector: string, child: HTMLElement): T {
  return child.closest(selector) as T;
}

export function selectParentIdx(el: HTMLElement): number {
  const $parent = selectParent('[data-idx]', el) as HTMLElement;
  return Number($parent.dataset.idx);
}

export function parseFormData <T>(form: HTMLFormElement): T {
  return  [...new FormData(form)].reduce((obj: Record<string, string>, [k, v]) => {
    obj[k] = v as string;
    return obj;
  }, {}) as unknown as T;
}

export function getNextIdx () {
  let idx = Date.now();
  return (() => {

    idx += 1;
    return idx;
  })();
}

export function debounce(fn: Function) {
  let call: number = 0;
  return (...args: any[]) => {
    cancelAnimationFrame(call);
    call = requestAnimationFrame(() => fn(...args));
  }
}
