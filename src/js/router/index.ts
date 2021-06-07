import { PATH } from "@/constants";
import { Login } from "@/pages";
import Component from "@/core/component";
import Router from "@/core/router";

type IPages = {
  [pathname in PATH]: Component;
};

const router = new Router<IPages>({
  [PATH.LOGIN]: new Login(),
  [PATH.LINE]: new Login(),
  [PATH.SECTIONS]: new Login(),
  [PATH.SIGNUP]: new Login(),
  [PATH.STATIONS]: new Login(),
});

export default router;
