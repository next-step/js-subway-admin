import { createLinesListsTemplates } from './createTemplate';
import { lines } from '../dummyData';

const linesTemplate = (): string => `
<div class="wrapper bg-white p-10 lines-wrapper">
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
  ${createLinesListsTemplates(lines)}
  </ul>
</div>
`;

export default linesTemplate;
