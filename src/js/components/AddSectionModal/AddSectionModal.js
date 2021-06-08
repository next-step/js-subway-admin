import addSectionModalCss from 'js/components/AddSectionModal/addSectionModal.module.css';
import { Heading, Modal } from '..';

const { modalInner } = addSectionModalCss;

const AddSectionModal = () => {
  const $header = document.createElement('header');
  $header.appendChild(Heading({ level: 2, className: 'text-center', children: '🔁 구간 추가' }));

  const $addSectionForm = document.createElement('form');
  $addSectionForm.innerHTML = `
  <div class="input-control">
    <label for="subway-line-for-section" class="input-label" hidden>노선</label>
    <select id="subway-line-for-section">
      <option>1호선</option>
      <option>2호선</option>
      <option>3호선</option>
      <option>4호선</option>
    </select>
  </div>
  <div class="d-flex items-center input-control">
    <label for="up-station" class="input-label" hidden>상행역</label>
    <select id="up-station">
      <option value="" selected disabled hidden>상행역</option>
      <option>사당</option>
      <option>방배</option>
      <option>서초</option>
    </select>
    <div class="d-inline-block mx-3 text-2xl">➡️</div>
    <label for="down-station" class="input-label" hidden>하행역</label>
    <select id="down-station">
      <option value="" selected disabled hidden>하행역</option>
      <option>사당</option>
      <option>방배</option>
      <option>서초</option>
    </select>
  </div>
  <div class="d-flex justify-end mt-3">
    <button
      type="submit"
      name="submit"
      class="input-submit bg-cyan-300"
    >
      확인
    </button>
  </div>
  `;

  const $AddSectionFragment = document.createDocumentFragment();
  $AddSectionFragment.appendChild($header);
  $AddSectionFragment.appendChild($addSectionForm);

  return Modal({ children: $AddSectionFragment, className: modalInner });
};

export default AddSectionModal;
