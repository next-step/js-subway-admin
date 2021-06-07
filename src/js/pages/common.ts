import { $ } from '../utils/dom';
import { pagesInfo } from '../utils/constants';
import { headerTemplate } from '../templates/index';
import render from '../utils/render';
import { setState } from '../utils/state';

const $header = $('header');
const $main = $('main');
const currentPath = window.location.pathname;
const renderHeader = render($header);
const renderMain = render($main);
const { template, name } = pagesInfo[currentPath];

const onClickNav = (e: MouseEvent): void => {
  e.preventDefault();

  const target = e.target as HTMLAnchorElement;

  if (!target.matches('a')) return;

  const href = target.getAttribute('href');

  if (!href) return;

  const { path, name, title, template } = pagesInfo[href];

  window.history.pushState({ path, title }, title, path);
  renderMain(template);
  setState('currentPage', name);
};

const onPopstate = (e: PopStateEvent): void => {
  const { template, name } = pagesInfo[e.state.path];
  renderMain(template);
  setState('currentPage', name);
};

renderHeader(headerTemplate);
renderMain(template);
setState('currentPage', name);

$header.addEventListener('click', onClickNav);
window.addEventListener('popstate', onPopstate);
