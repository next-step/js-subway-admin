import { StringKeyObject, BindingEvent } from '../types/index';
import { PagesPath } from '../utils/constants';
import {
  onAddStation,
  onClickEditModalOpen,
  onClickEditModalClose,
  onEdit
} from './stations/eventHandlers';

const pagesEvents: StringKeyObject<BindingEvent[]> = {
  [PagesPath.HOME]: [],
  [PagesPath.STATIONS]: [
    {
      selector: '.stations-wrapper form',
      event: 'submit',
      eventHandler: onAddStation
    },
    {
      selector: '.stations-wrapper ul',
      event: 'click',
      eventHandler: onClickEditModalOpen
    },
    {
      selector: '.modal .modal-close',
      event: 'click',
      eventHandler: onClickEditModalClose
    },
    {
      selector: '.modal form',
      event: 'submit',
      eventHandler: onEdit
    },
    {
      selector: '.modal form',
      event: 'submit',
      eventHandler: onClickEditModalClose
    }
  ],
  [PagesPath.LINES]: [],
  [PagesPath.SECTIONS]: [],
  [PagesPath.LOGIN]: []
};

export default pagesEvents;
