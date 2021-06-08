const onModalClose = ({ currentTarget }) => {
  currentTarget.parentNode.parentNode.classList.remove('open');
};

const Modal = ({ children, className = '' }) => {
  const $modal = document.createElement('div');
  $modal.className = 'modal';

  const $modalInner = document.createElement('div');
  $modalInner.className = `modal-inner p-8 ${className}`.trim();

  const $closeButton = document.createElement('button');
  $closeButton.type = 'button';
  $closeButton.className = 'modal-close';
  $closeButton.addEventListener('click', onModalClose);

  $closeButton.innerHTML = `
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>`;

  $modalInner.appendChild($closeButton);
  $modalInner.appendChild(children);

  $modal.appendChild($modalInner);

  return $modal;
};

export default Modal;
