import { createInputTemplate } from './createTemplate';

const stationsModalTemplate = (): string => `
<div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🚉 역 이름 수정</h2>
  </header>
  <form>
    <div class="input-control">
    ${createInputTemplate(
      'station-name-edit',
      'text',
      '역 이름',
      'required',
      'minlength="2" maxlength="20"'
    )}
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

export default stationsModalTemplate;
