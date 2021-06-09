/* eslint-disable max-len */
import { valueof } from '../types/index';

export const each = <Item, List>(
  list: Item[] | List,
  iterate: (item: Item, index?: number) => void
): void => {
  const _list = typeof list === 'string' ? list : [...list];
  for (let i = 0; i < _list.length; i++) {
    iterate(_list[i], i);
  }
};

export const map = <Item, NewItem>(
  list: Item[],
  mapper: (item: Item, index?: number) => NewItem
): NewItem[] => {
  const newList: NewItem[] = [];

  each(list, (item: Item, index?: number): void => {
    newList.push(mapper(item, index));
  });

  return newList;
};

export const filter = <Item, List>(
  list: Item[] | List,
  predicate: (item: Item) => boolean
): Item[] => {
  const newLIst: Item[] = [];

  each(list as Item[], (item: Item) => {
    if (predicate(item)) newLIst.push(item);
  });

  return newLIst;
};

export const some = <Item>(
  list: Item[],
  predicate: (item: Item) => boolean
): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }

  return false;
};

export const include = <Item>(
  list: Item[] | string | DOMTokenList,
  predicate: (item: Item | string | valueof<DOMTokenList>) => boolean
): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }

  return false;
};

export const findIndex = <Item>(
  list: Item[],
  predicate: (item: Item) => boolean
): number => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
};

export const find = <Item>(
  list: Item[] | DOMTokenList,
  predicate: (item: Item | string) => boolean
): Item | string | void => {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i];
  }
};

export const slice = <Item>(
  list: Item[] | string,
  startIndex: number,
  finishIndex?: number
): Item[] | string => {
  let value: Item[] | string;

  if (typeof list === 'string')
    value = list.slice(startIndex, finishIndex ? finishIndex + 1 : list.length);
  else
    value = [...list].slice(
      startIndex,
      finishIndex ? finishIndex + 1 : list.length
    );
  return value;
};

export const reduce = <T, Item>(
  list: Item[],
  acc: T,
  iterate: (acc: T, item: Item, index?: number) => void
): T => {
  for (let i = 0; i < list.length; i++) {
    iterate(acc, list[i], i);
  }

  return acc;
};
