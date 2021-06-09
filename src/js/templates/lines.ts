import { getData } from '../utils/storage';
import { createLinesItemTemplate } from '../utils/template';

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
<ul class="mt-3 pl-0 lines-list">
  ${createLinesItemTemplate(getData('lines'))}
</ul>
</div>`;

export default linesTemplate;
