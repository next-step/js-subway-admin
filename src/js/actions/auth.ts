import { ILoginUser, ISignUpUser } from "@/types";

export enum actions {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",

  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
}

export const LOGIN_REQUEST = (datas: ILoginUser) => {
  return { type: actions.LOGIN_REQUEST, datas };
};
export const LOGIN_SUCCESS = (datas) => {
  return { type: actions.LOGIN_SUCCESS, datas };
};
export const LOGIN_ERROR = (error: string) => {
  return { type: actions.LOGIN_FAILURE, error };
};

export const SIGNUP_REQUEST = (datas: ISignUpUser) => {
  return { type: actions.SIGNUP_REQUEST, datas };
};
export const SIGNUP_SUCCESS = () => {
  return { type: actions.SIGNUP_SUCCESS };
};
export const SIGNUP_ERROR = (error: string) => {
  return { type: actions.SIGNUP_FAILURE, error };
};

export const LOGOUT_REQUEST = () => {
  return { type: actions.LOGOUT_REQUEST };
};

export const LOGOUT_SUCCESS = () => {
  return { type: actions.LOGIN_SUCCESS };
};
export const LOGOUT_ERROR = (error: string) => {
  return { type: actions.LOGOUT_FAILURE, error };
};
