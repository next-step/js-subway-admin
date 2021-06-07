export interface IPageInfo {
  title: string;
  contents: IContents;
}

export interface IContents {
  main: string;
  modal?: string;
}
