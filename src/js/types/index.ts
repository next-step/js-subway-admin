export interface IPageInfo {
  title: string;
  href: string;
}

export interface IAuth {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface IStation {
  id: string;
  name: string;
  lines: string;
}

export interface ILine {
  id: string;
  name: string;
  color: string;
  upStation: string;
  downStation: string;
  distance: string;
  time: string;
}
