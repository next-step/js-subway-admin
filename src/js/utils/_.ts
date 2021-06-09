export const _each = <T>(
  list: T[],
  iter: (val: T, idx?: number) => void
): void => {
  for (let i = 0; i < list.length; i++) {
    iter(list[i], i);
  }
};

export const _map = <T, U>(
  list: T[],
  mapper: (val: T, idx?: number) => U
): U[] => {
  const newList: U[] = [];

  _each<T>(list, (val: T, idx?: number) => {
    newList.push(mapper(val, idx));
  });
  return newList;
};

export const _filter = <T, U>(
  list: T[] | U,
  predi: (val: T) => boolean
): T[] => {
  const newList: T[] = [];

  _each(list as T[], (val: T) => {
    if (predi(val)) newList.push(val);
  });
  return newList;
};

export const _some = <T>(list: T[], predi: (val: T) => boolean): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (predi(list[i])) return true;
  }
  return false;
};

export const _reduce = <T, U>(
  list: T[],
  red: (acc: U, val: T, idx: number) => void,
  acc: U
): U => {
  for (let i = 0; i < list.length; i++) {
    red(acc, list[i], i);
  }
  return acc;
};
