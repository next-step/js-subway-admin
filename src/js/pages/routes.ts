import { headerTemplate } from '../templates/index';
import { StringKeyObject } from '../types/index';
import { PagesPath } from '../utils/constants';
import { render, renderPages } from '../utils/render';
import $ from '../utils/dom';

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

const initPage = (): void => {
  const { pathname } = window.location;
  render(headerTemplate, $header);
  renderPages(pathname, $main);
};

const onClickNavigate = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (!target.matches('header > nav > a')) return;
  e.preventDefault();

  const path = target.getAttribute('href');

  if (!path) return;

  pushHistoryState(path);
  renderPages(path, $main);
};

$header.addEventListener('click', onClickNavigate);

window.addEventListener('popstate', e => {
  renderPages(e.state.path, $main);
});

initPage();
