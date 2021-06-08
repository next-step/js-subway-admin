import { PATH } from "@/constants";
import { Login, Stations, SignUp } from "@/pages";
import Component from "@/core/component";
import Router from "@/core/router";

type IPages = {
  [pathname in PATH]: Component;
};

const router = new Router<IPages>({
  [PATH.LOGIN]: new Login(),
  [PATH.LINE]: new Login(),
  [PATH.SECTIONS]: new Login(),
  [PATH.SIGNUP]: new SignUp(),
  [PATH.STATIONS]: new Stations(),
});

export default router;
