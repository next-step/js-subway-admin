export enum Message {
  INVALID_VALUE = '형식에 맞지 않거나 중복된 이름입니다😢',
  CONFIRM_REMOVE = '정말로 삭제하시겠습니까?',
  CANNOT_REMOVE_STATION = '노선에 등록되어 있는 역이므로 삭제할 수 없습니다😢'
}

export type valueof<T> = T[keyof T];

export type StorageKey = 'lines' | 'stations' | 'sections';

export interface ObjectStringKey<T> {
  [key: string]: T;
}

export interface StateObj<T> {
  [key: string]: T;
}

export interface BindingList {
  selector: string;
  event: string;
  handlers: ((e: Event) => void)[];
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

export interface LinesFormData {
  lineName: string;
  upLineStation: string;
  downLineStation: string;
  distance: number;
  time: number;
  color: string;
}
