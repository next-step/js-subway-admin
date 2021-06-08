import { StorageKey } from '../types/index';

export const getData = <Item>(key: StorageKey): Item[] => {
  const data = localStorage.getItem(key);
  if (!data) return [];
  return JSON.parse(data);
};

export const setData = <Item>(key: StorageKey, value: Item[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addData = <Item>(key: StorageKey, value: Item): Item[] => {
  const newData = [...getData<Item>(key), value];
  setData(key, newData);
  return newData;
};

export const replaceData = <Item>(
  key: StorageKey,
  value: Item,
  index: number
): void => {
  const newData = [...getData(key)];
  newData[index] = value;
  setData(key, newData);
};
