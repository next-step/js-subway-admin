interface IDataBase {
  id: string;
}

class LocalStorage<T extends IDataBase> {
  constructor(readonly key: string) {}

  public getAll(): T[] {
    const items = localStorage.getItem(this.key) ?? "[]";
    return JSON.parse(items);
  }

  public set(items: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  public get(id: string): T | null {
    const datas = this.getAll();
    const item = datas.find((data) => data.id === id);
    return item;
  }

  public add(item: T): T[] {
    const datas = this.getAll();
    const newData = [...datas, item];
    this.set(newData);
    return newData;
  }
}

export default LocalStorage;
