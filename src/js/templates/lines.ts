import { getData } from '../utils/storage';
import { createListTemplate } from '../utils/template';
import itemButtonsTemplate from './itemButtons';

const getLinesItemTemplate = (
  line: string
): string => `<li class="d-flex items-center py-2 relative">
<span class="subway-line-color-dot bg-blue-400"></span>
<span class="w-100 pl-6 subway-line-list-item-name"
  >${line}</span
>
${itemButtonsTemplate}
</li>
<hr class="my-0" />`;

const linesTemplate =
  (): string => `<div class="wrapper bg-white p-10 lines-container">
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
  <button
    type="button"
    class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
  >
    노선 추가
  </button>
</div>
<ul class="mt-3 pl-0">
  ${createListTemplate(getLinesItemTemplate)(getData('lines'))}
</ul>
</div>`;

export default linesTemplate;
