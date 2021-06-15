import {
  createOptionsTemplates,
  createStationListsTemplates
} from './createTemplate';
import { getData } from '../utils/storage';
import { lines } from '../dummyData';

const sectionsTemplate = (): string => `
<div class="wrapper bg-white p-10 sections-wrapper">
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
    ${createOptionsTemplates(lines)}
    </select>
  </form>
  <ul class="mt-3 pl-0">
  ${createStationListsTemplates(getData('stations'))}
  </ul>
</div>
`;

export default sectionsTemplate;
