import { $ } from '../utils/dom';
import { each } from '../libs/index';
import { pagesInfo } from '../utils/constants';
import { BindingList } from '../types/index';
import { headerTemplate } from '../templates/index';
import render from '../utils/render';

const $header = $('header');
const renderMain = render($('main'));
const { template, bindingList } = pagesInfo[window.location.pathname];

const bindEvents = (list: BindingList[]): void => {
  each(list, (item: BindingList) => {
    const { selector, event, handler } = item;
    $(selector).addEventListener(event, handler);
  });
};

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
