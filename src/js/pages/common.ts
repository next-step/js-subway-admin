import { $ } from '../utils/dom';

const closeModal = (): void => {
  $('.modal').classList.remove('open');
};

export default closeModal;
