export const each = <T>(list: T[], iter: (item: T) => void): void => {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
};

export const map = <T, U>(list: T[], mapper: (item: T) => U): U[] => {
  const newList: U[] = [];

  each(list, (item: T): void => {
    newList.push(mapper(item));
  });

  return newList;
};

export const filter = <T>(list: T[], predicate: (item: T) => boolean): T[] => {
  const newLIst: T[] = [];

  each(list, (item: T) => {
    if (predicate(item)) newLIst.push(item);
  });

  return newLIst;
};
