import {Router} from "~@core";

export const router = new Router({
  routes: {
    '/': 'StationsPage',
    '/stations': 'StationsPage',
    '/lines': 'LinesPage',
    '/sections': 'SectionsPage',
    '/login': 'LoginPage',
    '/signup': 'SignUpPage',
    '/mypage': 'MyPage',
  }
});

export * from "./RouterLink";
export * from "./RouterView";
