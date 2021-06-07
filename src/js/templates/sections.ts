import { downLineStations, subwayLines, upLineStations } from '../utils/mock';
import { optionTemplate, createListTemplate } from './common';

export const sectionListItemTemplate = (
  section: string
): string => `<li class="d-flex items-center py-2 relative">
<span class="w-100 pl-6">${section}</span>
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

export const sectionsTemplate = (
  sectionList = []
): string => `<div class="wrapper bg-white p-10 sections-container">
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
    ${createListTemplate(subwayLines, optionTemplate)}
  </select>
</form>
<ul class="mt-3 pl-0">
  ${createListTemplate(sectionList, sectionListItemTemplate)}
</ul>
</div>`;

export const sectionsModal = `<div class="modal">
<div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🔁 구간 추가</h2>
  </header>
  <form>
    <div class="input-control">
      <label for="subway-line-for-section" class="input-label" hidden
        >노선</label
      >
      <select id="subway-line-for-section">
      ${createListTemplate(subwayLines, optionTemplate)}
      </select>
    </div>
    <div class="d-flex items-center input-control">
      <label for="up-station" class="input-label" hidden>상행역</label>
      <select id="up-station">
        <option value="" selected disabled hidden>상행역</option>
        ${createListTemplate(upLineStations, optionTemplate)}
      </select>
      <div class="d-inline-block mx-3 text-2xl">➡️</div>
      <label for="down-station" class="input-label" hidden
        >하행역</label
      >
      <select id="down-station">
        <option value="" selected disabled hidden>하행역</option>
        ${createListTemplate(downLineStations, optionTemplate)}
      </select>
    </div>
    <div class="d-flex justify-end mt-3">
      <button
        type="submit"
        name="submit"
        class="input-submit bg-cyan-300"
      >
        확인
      </button>
    </div>
  </form>
</div>
</div>`;
