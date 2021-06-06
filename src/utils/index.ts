export function selectOne <T extends HTMLElement>(selector: string, parent = document): T {
  return parent.querySelector(selector) as T;
}

export function selectAll <T extends HTMLElement>(selector: string, parent = document): T[] {
  return [ ...parent.querySelectorAll(selector) ] as T[];
}
