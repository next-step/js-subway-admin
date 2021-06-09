import colorOptions from '../utils/mock';
import stationsSelectTemplate from './stationsSelect';
import { createSubwayLineColorOptionsTemplate } from '../utils/template';

const linesModalTemplate = (): string => `<div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🛤️ 노선 추가</h2>
  </header>
  <form>
    <div class="input-control">
      <label for="subway-line-name" class="input-label" hidden
        >노선 이름</label
      >
      <input
        type="text"
        id="subway-line-name"
        name="subway-line-name"
        class="input-field line-name-input"
        placeholder="노선 이름"
        required
      />
    </div>
    ${stationsSelectTemplate()}
    <div class="input-control">
      <label for="distance" class="input-label" hidden
        >상행 하행역 거리</label
      >
      <input
        type="number"
        id="distance"
        name="distance"
        class="input-field mr-2"
        placeholder="상행 하행역 거리"
        required
      />
      <label for="duration" class="input-label" hidden
        >상행 하행역 시간</label
      >
      <input
        type="number"
        id="duration"
        name="arrival"
        class="input-field"
        placeholder="상행 하행역 시간"
        required
      />
    </div>
    <div class="input-control">
      <div>
        <label for="subway-line-color" class="input-label" hidden
          >색상</label
        >
        <input
          type="text"
          id="subway-line-color"
          name="subway-line-color"
          class="input-field subway-line-color-input"
          placeholder="색상을 아래에서 선택해주세요."
          disabled
          required
        />
      </div>
    </div>
    <div class="subway-line-color-selector px-2">${createSubwayLineColorOptionsTemplate(
      colorOptions
    )}</div>
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
</div>`;

export default linesModalTemplate;
