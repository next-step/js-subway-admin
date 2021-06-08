export const _each = <T>(list: T[], iter: (val: T) => void): void => {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
};

export const _map = <T, U>(list: T[], mapper: (val: T) => U): U[] => {
  const newList: U[] = [];

  _each<T>(list, (val: T) => {
    newList.push(mapper(val));
  });
  return newList;
};

export const _filter = <T>(list: T[], predi: (val: T) => boolean): T[] => {
  const newList: T[] = [];

  _each(list, (val: T) => {
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
