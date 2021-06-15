import { getData } from '../utils/storage';
import { createOptionsTemplate } from '../utils/template';

const stationsSelectTemplate =
  (): string => `<div class="d-flex items-center input-control">
  <label for="up-station" class="input-label" hidden>상행역</label>
  <select id="up-station" class="mr-2" required>
    <option value="" selected disabled hidden>상행역</option>
    ${createOptionsTemplate(getData('stations'))}
  </select>
  ${
    window.location.pathname === 'sections'
      ? '<div class="d-inline-block mx-3 text-2xl">➡️</div>'
      : ''
  }
  <label for="down-station" class="input-label" hidden
    >하행역</label
  >
  <select id="down-station" required>
    <option value="" selected disabled hidden>하행역</option>
    ${createOptionsTemplate(getData('stations'))}
  </select>
  </div>`;

export default stationsSelectTemplate;
