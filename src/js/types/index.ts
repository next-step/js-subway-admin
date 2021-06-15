export enum LoginEnum {
  EMAIL = "email",
  PASSWORD = "password",
}

export enum SignUpEnum {
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
  CONFIRMPASSWORD = "confirmPassword",
}

export enum LineEnum {
  NAME = "name",
  UP = "upStation",
  DOWN = "downStation",
  COLOR = "color",
  DISTANCE = "distance",
  TIME = "time",
}

export interface ILoginUser {
  [LoginEnum.EMAIL]: string;
  [LoginEnum.PASSWORD]: string;
}

export interface ISignUpUser {
  [SignUpEnum.EMAIL]: string;
  [SignUpEnum.NAME]: string;
  [SignUpEnum.PASSWORD]: string;
  [SignUpEnum.CONFIRMPASSWORD]: string;
}

export interface ILineData {
  [LineEnum.NAME]: string;
  [LineEnum.UP]: string;
  [LineEnum.DOWN]: string;
  [LineEnum.COLOR]: string;
  [LineEnum.DISTANCE]: string;
  [LineEnum.TIME]: string;
}

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

export interface ILine extends ILineData {
  id: string;
}

export interface IAction {
  type: string;
  datas?: unknown;
  error?: string;
}
