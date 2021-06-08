import { $ } from '../utils/dom';

const onCloseModal = (): void => {
  $('.modal').classList.remove('open');
};

export default onCloseModal;
