import { PATH } from "@/constants";
import { Login, Stations, SignUp, Lines } from "@/pages";
import Component from "@/core/component";
import Router from "@/core/router";

type IPages = {
  [pathname in PATH]: Component;
};

const login = new Login();
const station = new Stations();
const signUp = new SignUp();
const lines = new Lines();

const router = new Router<IPages>({
  [PATH.LOGIN]: login,
  [PATH.LINE]: lines,
  [PATH.SECTIONS]: new Login(),
  [PATH.SIGNUP]: signUp,
  [PATH.STATIONS]: station,
});

export default router;
