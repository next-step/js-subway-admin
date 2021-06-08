import { headerTemplate } from '../templates/index';
import { StringKeyObject } from '../types/index';
import { PagesPath } from '../utils/constants';
import { render, renderPages, renderModals } from '../utils/render';
import $ from '../utils/dom';
import bindEvents from '../utils/bindEvents';
import pagesEvents from './pagesEvents';
import { _some } from '../utils/_';

const $app = $('#app');
const $main = $('main');
const $header = $('header');

const titles: StringKeyObject<string> = {
  [PagesPath.HOME]: '🚇 지하철 노선도',
  [PagesPath.STATIONS]: '🚉 역 관리',
  [PagesPath.LINES]: '🛤️ 노선 관리',
  [PagesPath.SECTIONS]: '🔁 구간 관리',
  [PagesPath.LOGIN]: '👤 로그인'
};

const pushHistoryState = (path: string): void => {
  window.history.pushState({ path }, '', path);
  document.title = titles[path];
};

const validatePathname = (path: string): boolean => {
  if (
    !_some(
      Object.values(PagesPath),
      value => value !== '/page-not-found' && value === path
    )
  ) {
    window.history.replaceState(
      { path: '/page-not-found' },
      '',
      '/page-not-found'
    );
    renderPages(PagesPath.PAGENOTFOUND, $app);
    return false;
  }
  return true;
};

const initPage = (): void => {
  const { pathname } = window.location;

  if (!validatePathname(pathname)) return;
  render(headerTemplate, $header);
  renderPages(pathname, $main);
  renderModals(pathname);
  bindEvents(pathname, pagesEvents);
};

const onClickNavigate = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (!target.matches('header > nav > a')) return;
  e.preventDefault();

  const path = target.getAttribute('href');

  if (!path) return;
  if (!validatePathname(path)) return;

  pushHistoryState(path);
  renderPages(path, $main);
  renderModals(path);
  bindEvents(path, pagesEvents);
};

const onGoBack = (e: PopStateEvent): void => {
  const { path } = e.state;

  renderPages(path, $main);
  renderModals(path);
  bindEvents(path, pagesEvents);
};

$header.addEventListener('click', onClickNavigate);

window.addEventListener('popstate', onGoBack);

initPage();
