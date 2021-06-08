import { $ } from './dom';
import { each } from '../libs/index';
import { BindingList } from '../types/index';

const bindEvents = (list: BindingList[]): void => {
  each(list, (item: BindingList) => {
    const { selector, event, handlers } = item;
    each(handlers, handler => $(selector).addEventListener(event, handler));
  });
};

export default bindEvents;
