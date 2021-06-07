export type valueof<T> = T[keyof T];

export interface State {
  currentPage: 'home' | 'sections' | 'lines' | 'stations' | 'login';
}

export interface PagesInfo {
  [key: string]: {
    path: string;
    name: State['currentPage'];
    title: string;
    template: string;
  };
}

export type StorageKey =
  | 'lines'
  | 'stations'
  | 'subwayLines'
  | 'sections'
  | 'upLineStations'
  | 'downLineStations';
