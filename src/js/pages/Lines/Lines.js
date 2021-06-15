import linesCss from 'js/pages/Lines/lines.module.css';
import { Heading, SubwayLineList } from 'js/components';
import AddSubwayLineModal from 'js/components/AddSubwayLineModal/AddSubwayLineModal';

const { createLineBtn } = linesCss;

const onModalShow = () => {
  const $modal = document.querySelector('.modal');
  $modal.classList.add('open');
};

const Lines = () => {
  const $lines = document.createElement('div');
  $lines.className = 'wrapper bg-white p-10';

  const $headingContainer = document.createElement('div');
  $headingContainer.className = 'heading d-flex';

  const $addLineButton = document.createElement('button');
  $addLineButton.type = 'button';
  $addLineButton.className = `${createLineBtn} modal-trigger-btn bg-cyan-300 ml-2`;
  $addLineButton.textContent = '노선 추가';
  $addLineButton.addEventListener('click', onModalShow);

  $headingContainer.appendChild(Heading({ level: 2, className: 'mt-1 w-100', children: '🛤️ 노선 관리' }));
  $headingContainer.appendChild($addLineButton);

  $lines.appendChild($headingContainer);
  $lines.appendChild(SubwayLineList());

  const $linesPageFragment = document.createDocumentFragment();

  $linesPageFragment.appendChild($lines);
  $linesPageFragment.appendChild(AddSubwayLineModal());

  return $linesPageFragment;
};

export default Lines;
