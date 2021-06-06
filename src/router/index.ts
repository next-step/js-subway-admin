import {Router} from "~@core";

export const router = new Router({
  routes: {
    '/': 'Stations',
    '/stations': 'Stations',
    '/lines': 'Lines',
    '/sections': 'Sections',
    '/login': 'Login',
    '/signup': 'SignUp',
  }
});

export * from "./RouterLink";
export * from "./RouterView";
