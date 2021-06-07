import { PagesInfo } from '../types/index';
import { stationsTemplate } from '../templates/stations';
import { lineTemplate } from '../templates/lines';
import { sectionsTemplate } from '../templates/sections';
import loginTemplate from '../templates/login';
import homeTemplate from '../templates/home';

export const pagesInfo: PagesInfo = {
  '/': { path: '/', title: '🚇 지하철 노선도', template: homeTemplate },
  '/login': { path: '/login', title: '👤 로그인', template: loginTemplate },
  '/stations': {
    path: '/stations',
    title: '🚉 역 관리',
    template: stationsTemplate()
  },
  '/lines': { path: '/lines', title: '🛤️ 노선 관리', template: lineTemplate() },
  '/sections': {
    path: '/sections',
    title: '🔁 구간 관리',
    template: sectionsTemplate()
  }
};

export const a = '';
