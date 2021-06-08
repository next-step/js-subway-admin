export type valueof<T> = T[keyof T];

export interface BindingList {
  selector: string;
  event: string;
  handler: (e: Event) => void;
}
export interface PagesInfo {
  [key: string]: {
    path: string;
    name: string;
    title: string;
    template: string | (() => string);
    bindingList?: BindingList[];
  };
}

export type StorageKey =
  | 'lines'
  | 'stations'
  | 'subwayLines'
  | 'sections'
  | 'upLineStations'
  | 'downLineStations';
