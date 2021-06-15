import { createStationSelectTemplate } from './createTemplate';

const sectionsModalTemplate = (): string => `
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
        <option>1호선</option>
        <option>2호선</option>
        <option>3호선</option>
        <option>4호선</option>
      </select>
    </div>
    <div class="d-flex items-center input-control">
      ${createStationSelectTemplate('up-station', '상행역')}
      <div class="d-inline-block mx-3 text-2xl">➡️</div>
      ${createStationSelectTemplate('down-station', '하행역')}
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
`;

export default sectionsModalTemplate;
