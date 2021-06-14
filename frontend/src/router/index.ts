import {Router} from "@/_core";

export const router = new Router({
  routes: {
    '/stations': 'StationsPage',
    '/lines': 'LinesPage',
    '/sections': 'SectionsPage',
    '/login': 'LoginPage',
    '/signup': 'SignUpPage',
    '/mypage': 'MyPage',
  },
  hash: false,
});

export * from "./RouterLink";
export * from "./RouterView";
