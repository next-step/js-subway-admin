export interface BaseEntity {
  idx?: number;
  updatedAt?: number;
  createdAt?: number;
}

export interface LineEntity extends BaseEntity {
  name: string;
  color: string;
}

export interface SectionEntity extends BaseEntity {
  upStation: number;
  downStation: number;
  distance: number;
  duration: number;
  line: number;
}

export interface StationEntity extends BaseEntity {
  name: string;
}

export interface UserEntity extends BaseEntity {
  name: string;
  email: string;
  password: string;
}

export enum EntityName {
  USERS = 'users',
  LINES = 'lines',
  SECTIONS = 'sections',
  STATIONS = 'stations',
}

export interface AllEntities {
  [EntityName.USERS]: UserEntity[];
  [EntityName.LINES]: LineEntity[];
  [EntityName.SECTIONS]: SectionEntity[];
  [EntityName.STATIONS]: StationEntity[];
}
