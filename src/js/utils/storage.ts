import { LocalStorageKey } from '../types/index';

export const getData = <T>(key: LocalStorageKey): T[] => {
  const value = localStorage.getItem(key);

  if (!value) return [];
  return JSON.parse(value);
};

export const setData = <T>(key: LocalStorageKey, value: T[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
