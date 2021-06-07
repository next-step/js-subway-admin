export const each = <Item>(
  list: Item[],
  iterate: (item: Item) => void
): void => {
  for (let i = 0; i < list.length; i++) {
    iterate(list[i]);
  }
};

export const map = <Item, NewItem>(
  list: Item[],
  mapper: (item: Item) => NewItem
): NewItem[] => {
  const newList: NewItem[] = [];

  each(list, (item: Item): void => {
    newList.push(mapper(item));
  });

  return newList;
};

export const filter = <Item>(
  list: Item[],
  predicate: (item: Item) => boolean
): Item[] => {
  const newLIst: Item[] = [];

  each(list, (item: Item) => {
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
