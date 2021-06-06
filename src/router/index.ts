import {Component, Router} from "~@core";
import {Stations, Lines, Sections, Login, SignUp} from "~pages";
import {selectOne} from "~utils";

export const createRouter = (createComponent: ($el: HTMLElement) => Component) => {
  const $router = selectOne('[data-component="Router"]');
  if ($router) {
    createComponent($router);
  }
}

export const router = new Router({
  route: {
    '/': () => createRouter($router => new Stations($router)),
    '/stations': () => createRouter($router => new Stations($router)),
    '/lines': () => createRouter($router => new Lines($router)),
    '/sections': () => createRouter($router => new Sections($router)),
    '/login': () => createRouter($router => new Login($router)),
    '/signup': () => createRouter($router => new SignUp($router)),
  }
});
