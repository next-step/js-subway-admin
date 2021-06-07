import { headerTemplate } from '../templates/common';
import { $ } from '../utils/dom';
import { pagesInfo } from '../utils/constants';
import render from '../utils/render';

const $header = $('header');
const $main = $('main');
const currentPath = window.location.pathname;
const renderHeader = render($header);
const renderMain = render($main);

const onClickNav = (e: MouseEvent): void => {
  e.preventDefault();

  const target = e.target as HTMLAnchorElement;

  if (!target.matches('a')) return;

  const href = target.getAttribute('href');

  if (!href) return;

  const { path, title, template } = pagesInfo[href];

  window.history.pushState({ path, title }, title, path);
  renderMain(template);
};

const onPopstate = (e: PopStateEvent): void => {
  renderMain(pagesInfo[e.state.path].template);
};

renderHeader(headerTemplate);
renderMain(pagesInfo[currentPath].template);

$header.addEventListener('click', onClickNav);
window.addEventListener('popstate', onPopstate);
