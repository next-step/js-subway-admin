import { getData } from '../utils/storage';
import { createListTemplate, createOptionsTemplate } from '../utils/template';
import itemButtonsTemplate from './itemButtons';

const getSectionsItemTemplate = (
  section: string
): string => `<li class="d-flex items-center py-2 relative">
<span class="w-100 pl-6">${section}</span>
${itemButtonsTemplate}
</li>
<hr class="my-0" />`;

const sectionsTemplate =
  (): string => `<div class="wrapper bg-white p-10 sections-container">
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🔁 구간 관리</h2>
  <button
    type="button"
    class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
  >
    구간 추가
  </button>
</div>
<form class="d-flex items-center pl-1">
  <label for="subway-line" class="input-label" hidden>노선</label>
  <select id="subway-line" class="bg-blue-400">
    ${createOptionsTemplate(getData('subwayLines'))}
  </select>
</form>
<ul class="mt-3 pl-0">
  ${createListTemplate(getSectionsItemTemplate)(getData('sections'))}
</ul>
</div>`;

export default sectionsTemplate;
