import { getData } from '../utils/storage';
import { createStationsItemTemplate } from '../utils/template';

const stationsTemplate =
  (): string => `<div class="wrapper bg-white p-10 stations-container">
      <div class="heading">
        <h2 class="mt-1">🚉 역 관리</h2>
      </div>
      <form>
        <div class="d-flex w-100">
          <label for="station-name" class="input-label" hidden>
            역 이름
          </label>
          <input
            type="text"
            id="station-name"
            name="stationName"
            class="input-field"
            placeholder="역 이름"
            required
          />
          <button
            type="submit"
            name="submit"
            class="input-submit bg-cyan-300 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul class="mt-3 pl-0 stations-list">
        ${createStationsItemTemplate(getData('stations'))}
      </ul>
    </div>`;

export default stationsTemplate;
