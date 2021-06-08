import { PATH } from "@/constants";
import { Login, Stations, SignUp } from "@/pages";
import { stationStore } from "@/store";
import Component from "@/core/component";
import Router from "@/core/router";

type IPages = {
  [pathname in PATH]: Component;
};

const login = new Login();
const station = new Stations();

stationStore.addObserver(station);

const router = new Router<IPages>({
  [PATH.LOGIN]: login,
  [PATH.LINE]: new Login(),
  [PATH.SECTIONS]: new Login(),
  [PATH.SIGNUP]: new SignUp(),
  [PATH.STATIONS]: station,
});

export default router;
