import { StringKeyObject } from '../types/index';
import { PagesPath } from './constants';
import {
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  homeTemplate
} from '../templates/index';

const pageTemplates: StringKeyObject<string> = {
  [PagesPath.HOME]: homeTemplate,
  [PagesPath.STATIONS]: stationsTemplate,
  [PagesPath.LINES]: linesTemplate,
  [PagesPath.SECTIONS]: sectionsTemplate,
  [PagesPath.LOGIN]: loginTemplate
};

export const render = (template: string, node: HTMLElement): void => {
  node.innerHTML = template;
};

export const renderPages = (path: string, node: HTMLElement): void => {
  node.innerHTML = pageTemplates[path];
};
