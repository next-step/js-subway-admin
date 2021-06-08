interface IDataBase {
  id: string;
}

class LocalStorage<T extends IDataBase> {
  constructor(readonly key: string) {}

  public getAll(): T[] {
    const items = localStorage.getItem(this.key) ?? "[]";
    return JSON.parse(items);
  }

  public set(item: T): void {
    localStorage.setItem(this.key, JSON.stringify(item));
  }

  public get(id: string): T | null {
    const datas = this.getAll();
    const item = datas.find((data) => data.id === id);
    return item;
  }
}

export default LocalStorage;
