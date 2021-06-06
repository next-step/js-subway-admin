export function selectOne <T extends HTMLElement>(selector: string, parent: HTMLElement = document.body): T {
  return parent.querySelector(selector) as T;
}

export function selectAll <T extends HTMLElement>(selector: string, parent: HTMLElement = document.body): T[] {
  return [ ...parent.querySelectorAll(selector) ] as T[];
}

export function parseFormData <T>(form: HTMLFormElement): T {
  return  [...new FormData(form)].reduce((obj: Record<string, string>, [k, v]) => {
    obj[k] = v as string;
    return obj;
  }, {}) as unknown as T;
}
