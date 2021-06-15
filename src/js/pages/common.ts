import render from '../utils/render';
import { include } from '../libs/index';
import { $, $closest } from '../utils/dom';
import { Message, StorageKey } from '../types/index';
import { getData, removeData } from '../utils/storage';

export const closeModal = (): void => {
  $('.modal').classList.remove('open');
};

export const validateValue = <Value>(
  value: Value,
  predicateList: ((value: Value) => boolean)[]
): boolean => {
  for (let i = 0; i < predicateList.length; i++) {
    if (!predicateList[i](value)) return false;
  }
  return true;
};

export const getTargetItemName = (
  selector: string,
  node: HTMLElement
): string => $(selector, $closest('li', node)).innerHTML;

export const removeItem =
  <Data>(
    pageName: StorageKey,
    renderElement: string,
    targetSelector: string,
    createItemTemplate: (dataList: Data[]) => string,
    predecate: (target: string) => (data: Data) => boolean,
    checkMore?: (checkTarget: string) => boolean
  ) =>
  (e: Event): void => {
    const target = e.target as HTMLElement;

    if (!include(target.classList, item => item === 'remove-btn')) return;
    if (checkMore) {
      if (checkMore(getTargetItemName(targetSelector, target))) return;
    }
    if (!confirm(Message.CONFIRM_REMOVE)) return;

    removeData(pageName, predecate(getTargetItemName(targetSelector, target)));
    render($(renderElement))(createItemTemplate(getData(pageName)));
  };
