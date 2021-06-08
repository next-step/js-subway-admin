import { StringKeyObject, BindingEvent } from '../types/index';
import { PagesPath } from '../utils/constants';
import onAddStation from './stations/eventHandlers';

const pagesEvents: StringKeyObject<BindingEvent[]> = {
  [PagesPath.HOME]: [],
  [PagesPath.STATIONS]: [
    {
      selector: '.stations-wrapper form',
      event: 'submit',
      eventHandler: onAddStation
    }
  ],
  [PagesPath.LINES]: [],
  [PagesPath.SECTIONS]: [],
  [PagesPath.LOGIN]: []
};

export default pagesEvents;
