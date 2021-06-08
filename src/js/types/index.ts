export interface StringKeyObject<T> {
  [key: string]: T;
}

export interface BindingEvent {
  selector: string;
  event: string;
  eventHandler: (e: Event) => void;
}

export type LocalStorageKey = 'stations' | 'lines';
