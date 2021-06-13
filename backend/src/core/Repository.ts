import * as fs from "fs";
import * as path from "path";

import {AllEntities, BaseEntity} from "@/data";


export class Repository<Entity extends BaseEntity> {
  private static readonly PATH: string = path.resolve(__dirname, '../data/data.json');
  private static data: AllEntities = Repository.getData();

  private readonly entities: Entity[];

  constructor(
    private readonly entityName: string
  ) {
    this.entities = Repository.data[entityName] || [];
  }

  private static loadData(): AllEntities {
    return JSON.parse(fs.readFileSync(this.PATH, { encoding: 'utf-8' })) as AllEntities;
  }

  private static getData(): AllEntities {
    this.data = this.data || this.loadData();
    return this.data;
  }

  private static setData<T>(entityName: string, entities: T[]): void {
    const data = {
      ...this.data,
      [entityName]: entities
    }
    fs.writeFileSync(this.PATH, JSON.stringify(data), { encoding: 'utf-8' });
    this.data = Repository.loadData();
  }

  public findAll(): Entity[] {
    return this.entities;
  }

  public findByIdx(entityIdx: number): Entity | undefined {
    return this.entities.find(({ idx }) => idx === entityIdx);
  }

  public save(entity: Entity) {
    if (!entity.idx) {
      entity.idx = Date.now() + Math.round(Math.random() * 1000);
    }

    const index = this.entities.indexOf(this.findByIdx(entity.idx));

    const entities = [ ...this.entities ];

    if (index === -1) {
      entity.createdAt = Date.now();
      entity.updatedAt = Date.now();
      entities.push(entity);
    } else {
      entities[index] = entity;
      entity.updatedAt = Date.now();
    }

    console.log({ entities });

    Repository.setData<Entity>(this.entityName, entities);

    return entity;
  }

  public remove({ idx }) {
    const index = this.entities.indexOf(this.findByIdx(idx));
    if (index !== -1) {
      this.entities.splice(index, 1);
      Repository.setData<Entity>(this.entityName, this.entities);
    }
  }

}
