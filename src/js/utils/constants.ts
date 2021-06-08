import {
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  homeTemplate
} from '../templates/index';
import { PagesInfo } from '../types/index';
import { onAddStation, onShowEditModal } from '../pages/stations';

export const pagesInfo: PagesInfo = {
  '/': {
    path: '/',
    name: 'home',
    title: '🚇 지하철 노선도',
    template: homeTemplate
  },
  '/login': {
    path: '/login',
    name: 'login',
    title: '👤 로그인',
    template: loginTemplate
  },
  '/stations': {
    path: '/stations',
    name: 'stations',
    title: '🚉 역 관리',
    template: stationsTemplate,
    bindingList: [
      {
        selector: '.stations-container form',
        event: 'submit',
        handler: onAddStation
      },
      {
        selector: '.stations-container .edit-btn',
        event: 'click',
        handler: onShowEditModal
      }
    ]
  },
  '/lines': {
    path: '/lines',
    name: 'lines',
    title: '🛤️ 노선 관리',
    template: linesTemplate
  },
  '/sections': {
    path: '/sections',
    name: 'sections',
    title: '🔁 구간 관리',
    template: sectionsTemplate
  },
  '/page-not-found': {
    path: '/page-not-found',
    name: 'page-not-found',
    title: '페이지를 찾을 수 없습니다',
    template: '요청하신 페이지를 찾을 수 없습니다😢'
  }
};

export const a = '';
