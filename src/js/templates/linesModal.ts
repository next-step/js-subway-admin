import {
  createStationSelectTemplate,
  createInputTemplate
} from './createTemplate';

const linesModalTemplate = `
<div class="modal-inner p-8">
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
      ${createInputTemplate(
        'subway-line-name',
        'text',
        '노선 이름',
        'required'
      )}
    </div>
    <div class="d-flex items-center input-control">
      ${createStationSelectTemplate('up-station', '상행역', 'mr-2')}
      ${createStationSelectTemplate('down-station', '하행역')}
    </div>
    <div class="input-control">
      ${createInputTemplate(
        'distance',
        'number',
        '상행 하행역 거리',
        'required',
        'mr-2'
      )}
      ${createInputTemplate(
        'duration',
        'number',
        '상행 하행역 시간',
        'required'
      )}
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
          class="input-field"
          placeholder="색상을 아래에서 선택해주세요."
          disabled
          required
        />
      </div>
    </div>
    <div class="subway-line-color-selector px-2"></div>
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

export default linesModalTemplate;
