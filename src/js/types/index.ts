export interface StringKeyObject<T> {
  [key: string]: T;
}

export interface BindingEvent {
  selector: string;
  event: string;
  eventHandlerList: ((e: Event) => void)[];
}

export type LocalStorageKey = 'stations' | 'lines';

export interface LinesInfo {
  name: string;
  upLine: string;
  downLine: string;
  dist: number;
  time: number;
  color: string;
}
