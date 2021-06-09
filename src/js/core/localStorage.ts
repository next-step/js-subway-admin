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

  public remove(id: string): T[] {
    const datas = this.getAll();
    const newData = datas.filter((data) => data.id !== id);
    this.set(newData);
    return newData;
  }

  public update(id: string, nextData: object): T[] {
    const datas = this.getAll();
    const newData = datas.map((data) => {
      if (data.id === id) return { ...data, ...nextData };
      return data;
    });
    this.set(newData);
    return newData;
  }
}

export default LocalStorage;