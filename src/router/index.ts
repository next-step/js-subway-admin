import {Router} from "~@core";

export const router = new Router({
  route: {
    '/': () => console.log('home'),
    '/stations': () => console.log('stations'),
    '/lines': () => console.log('lines'),
    '/sections': () => console.log('sections'),
    '/login': () => console.log('login'),
  }
});
