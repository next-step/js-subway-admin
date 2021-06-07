import { getStationsListsTemplate, getOptionsTemplate } from './shared';
import {
  createMultipleLinesTemplates,
  createMultipleStationsTemplates
} from '../utils/createMultipleTemplates';

const sectionsTemplate = `
<div class="wrapper bg-white p-10">
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
    ${createMultipleLinesTemplates(getOptionsTemplate)}
    </select>
  </form>
  <ul class="mt-3 pl-0">
  ${createMultipleStationsTemplates(getStationsListsTemplate)}
  </ul>
</div>
`;

export default sectionsTemplate;
