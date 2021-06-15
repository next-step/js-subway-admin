import { StringKeyObject } from '../types/index';
import { PagesPath } from './constants';
import {
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  homeTemplate,
  pageNotFoundTemplate,
  linesModalTemplate,
  sectionsModalTemplate,
  stationsModalTemplate
} from '../templates/index';
import { $ } from './dom';
import { _some } from './_';

const $snackBar = $('#snackBar');
const $modal = $('.modal');

const pageTemplates: StringKeyObject<() => string> = {
  [PagesPath.HOME]: homeTemplate,
  [PagesPath.STATIONS]: stationsTemplate,
  [PagesPath.LINES]: linesTemplate,
  [PagesPath.SECTIONS]: sectionsTemplate,
  [PagesPath.LOGIN]: loginTemplate,
  [PagesPath.PAGENOTFOUND]: pageNotFoundTemplate
};

const modalTemplates: StringKeyObject<() => string> = {
  [PagesPath.STATIONS]: stationsModalTemplate,
  [PagesPath.LINES]: linesModalTemplate,
  [PagesPath.SECTIONS]: sectionsModalTemplate
};

export const render = (template: string, node: HTMLElement): void => {
  node.innerHTML = template;
};

export const renderPages = (path: string, node: HTMLElement): void => {
  node.innerHTML = pageTemplates[path]();
};

export const renderModals = (path: string): void => {
  if (!_some(Object.keys(modalTemplates), key => path === key)) return;
  $modal.innerHTML = modalTemplates[path]();
};

export const renderSnackBar = (message: string): void => {
  $snackBar.innerText = message;
  $snackBar.classList.toggle('show');
  setTimeout(() => {
    $snackBar.classList.toggle('show');
  }, 3000);
};
