import './pages/stations';

import { $ } from './utils/dom';
import { pagesInfo } from './utils/constants';
import { headerTemplate } from './templates/index';
import render from './utils/render';
import bindEvents from './utils/bindEvents';

const $header = $('header');
const renderMain = render($('main'));
const { template, bindingList } = pagesInfo[window.location.pathname];

const onClickNav = (e: MouseEvent): void => {
  e.preventDefault();

  const target = e.target as HTMLAnchorElement;

  if (!target.matches('a')) return;

  const href = target.getAttribute('href');

  if (!href) return;

  const { path, title, template, bindingList } = pagesInfo[href];

  window.history.pushState({ path, title }, title, path);
  renderMain(template);
  bindingList && bindEvents(bindingList);
};

const onPopstate = (e: PopStateEvent): void => {
  const { template, bindingList } = pagesInfo[e.state.path];
  renderMain(template);
  bindingList && bindEvents(bindingList);
};

renderMain(template);
bindingList && bindEvents(bindingList);

$header.addEventListener('click', onClickNav);
window.addEventListener('popstate', onPopstate);
window.addEventListener('DOMContentLoaded', () =>
  render($header)(headerTemplate)
);
