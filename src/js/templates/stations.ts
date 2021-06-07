import { getStationsListsTemplate } from './shared';
import {
  createMultipleStationsTemplates,
  createInputTemplate
} from './createTemplate';

const stationsTemplate = `
<div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
  </div>
  <form>
    <div class="d-flex w-100">
      ${createInputTemplate('station-name', 'text', '역 이름', 'required')}
      <button
        type="button"
        name="submit"
        class="input-submit bg-cyan-300 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul class="mt-3 pl-0">
  ${createMultipleStationsTemplates(getStationsListsTemplate)}    
  </ul>
</div>
`;

export default stationsTemplate;
