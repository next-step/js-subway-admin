import {
  createStationListsTemplates,
  createInputTemplate
} from './createTemplate';
import { getData } from '../utils/storage';

const stationsTemplate = (): string => `
<div class="wrapper bg-white p-10 stations-wrapper">
  <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
  </div>
  <form>
    <div class="d-flex w-100">
      ${createInputTemplate('station-name', 'text', '역 이름', 'required')}
      <button
        type="submit"
        name="submit"
        class="input-submit bg-cyan-300 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul class="mt-3 pl-0">
  ${createStationListsTemplates(getData('stations'))}   
  </ul>
</div>
`;

export default stationsTemplate;
