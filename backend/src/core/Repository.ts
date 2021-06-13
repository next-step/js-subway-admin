import * as fs from "fs";
import * as path from "path";

export class Repository<Entity extends { idx: number }> {
  private static readonly PATH: string = path.resolve(__dirname, '../data/data.json');
  private static data: any = Repository.getData();

  private readonly entities: Entity[];

  constructor(
    private readonly entityName: string
  ) {
    this.entities = Repository.data[entityName] || [];
  }

  private static loadData(): any {
    return JSON.parse(fs.readFileSync(this.PATH, { encoding: 'utf-8' }));
  }

  private static getData() {
    this.data = this.data || this.loadData();
  }

  private static setData<T>(entityName, entities: T): void {
    const data = {
      ...this.data,
      [entityName]: entities
    }
    fs.writeFileSync(this.PATH, JSON.stringify(data), { encoding: 'utf-8' });
    this.data = data;
  }

  public findAll() {
    return this.entities;
  }

  public findByIdx(entityIdx: number): Entity | undefined {
    return this.entities.find(({ idx }) => idx === entityIdx);
  }

  public save(entity) {
    if (!!entity.idx) {
      entity.idx = Date.now() + Math.round(Math.random() * 1000);
    }

    const index = this.entities.indexOf(this.findByIdx(entity.idx));

    const entities = [ ...this.entities ];

    if (index === -1) {
      entities.push(entity);
    } else {
      entities[index] = entity;
    }

    Repository.setData(this.entityName, entities);

    return entity;
  }

  public remove({ idx }) {
    const index = this.entities.indexOf(this.findByIdx(idx));
    if (index !== -1) {
      this.entities.splice(index, 1);
      Repository.setData(this.entityName, this.entities);
    }
  }

}
