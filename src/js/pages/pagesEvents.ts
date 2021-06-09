import { StringKeyObject, BindingEvent } from '../types/index';
import { PagesPath } from '../utils/constants';
import {
  onAddStation,
  onClickEditModalOpen,
  onClickEditModalClose,
  onEdit,
  onClickDelete
} from './stations/eventHandlers';
import {
  onModalOpen,
  onModalClose,
  onSubmitAddLine,
  onPickColor,
  onClickDeleteLine
} from './lines/eventHandlers';

const pagesEvents: StringKeyObject<BindingEvent[]> = {
  [PagesPath.HOME]: [],
  [PagesPath.STATIONS]: [
    {
      selector: '.stations-wrapper form',
      event: 'submit',
      eventHandlerList: [onAddStation]
    },
    {
      selector: '.stations-wrapper ul',
      event: 'click',
      eventHandlerList: [onClickEditModalOpen, onClickDelete]
    },
    {
      selector: '.modal .modal-close',
      event: 'click',
      eventHandlerList: [onClickEditModalClose]
    },
    {
      selector: '.modal form',
      event: 'submit',
      eventHandlerList: [onEdit, onClickEditModalClose]
    }
  ],
  [PagesPath.LINES]: [
    {
      selector: '.lines-wrapper .modal-trigger-btn',
      event: 'click',
      eventHandlerList: [onModalOpen]
    },
    {
      selector: '.modal .modal-close',
      event: 'click',
      eventHandlerList: [onModalClose]
    },
    {
      selector: '.modal form',
      event: 'submit',
      eventHandlerList: [onSubmitAddLine, onModalClose]
    },
    {
      selector: '.subway-line-color-selector',
      event: 'click',
      eventHandlerList: [onPickColor]
    },
    {
      selector: '.lines-wrapper ul',
      event: 'click',
      eventHandlerList: [onClickDeleteLine]
    }
  ],
  [PagesPath.SECTIONS]: [],
  [PagesPath.LOGIN]: []
};

export default pagesEvents;
