import { createListTemplate } from './common';

export const stationListItemTemplate = (
  station: string
): string => `<li class="station-list-item d-flex items-center py-2">
<span class="w-100 pl-2">${station}</span>
<button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm mr-1"
>
  수정
</button>
<button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm"
>
  삭제
</button>
</li>
<hr class="my-0" />`;

export const stationsTemplate = (
  stationList = []
): string => `<div class="wrapper bg-white p-10 stations-container">
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
            type="button"
            name="submit"
            class="input-submit bg-cyan-300 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul class="mt-3 pl-0">
        ${createListTemplate(stationListItemTemplate)(stationList)}
      </ul>
    </div>`;
