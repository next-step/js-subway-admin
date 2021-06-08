import sectionCss from 'js/pages/Sections/section.module.css';
import { AddSectionModal, Heading, SectionList } from 'js/components';

const { createSectionBtn } = sectionCss;

const onModalShow = () => {
  const $modal = document.querySelector('.modal');
  $modal.classList.add('open');
};

const Sections = () => {
  const $sections = document.createElement('div');
  $sections.className = 'wrapper bg-white p-10';

  const $headerContainer = document.createElement('div');
  $headerContainer.className = 'heading d-flex';

  const $addSectionButton = document.createElement('button');
  $addSectionButton.type = 'button';
  $addSectionButton.className = `${createSectionBtn} modal-trigger-btn bg-cyan-300 ml-2`;
  $addSectionButton.textContent = '구간 추가';
  $addSectionButton.addEventListener('click', onModalShow);

  $headerContainer.appendChild(Heading({ level: 2, children: '🔁 구간 관리', className: 'mt-1 w-100' }));
  $headerContainer.appendChild($addSectionButton);

  const $subwayLineSelectForm = document.createElement('form');
  $subwayLineSelectForm.className = 'd-flex items-center pl-1';

  $subwayLineSelectForm.innerHTML = `
  <label for="subway-line" class="input-label" hidden>노선</label>
  <select id="subway-line" class="bg-blue-400">
    <option>1호선</option>
    <option>2호선</option>
    <option>3호선</option>
    <option>4호선</option>
  </select>`;

  $sections.appendChild($headerContainer);
  $sections.appendChild($subwayLineSelectForm);

  $sections.appendChild(SectionList());

  const $sectionFragment = document.createDocumentFragment();

  $sectionFragment.appendChild($sections);
  $sectionFragment.appendChild(AddSectionModal());

  return $sectionFragment;
};

export default Sections;
