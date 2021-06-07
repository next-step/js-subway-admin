import { StorageKey } from '../types/index';

export const getData = <Item>(key: StorageKey): Item[] => {
  const data = localStorage.getItem(key);
  if (!data) return [];
  return JSON.parse(data);
};

export const setData = <Item>(key: string, value: Item[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
