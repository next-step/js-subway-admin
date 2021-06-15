const stationsEditModal = `<div class="modal-inner p-8">
<button class="modal-close">
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</button>
<header>
  <h2 class="text-center">🚉 역 수정</h2>
</header>
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
</div>`;

export default stationsEditModal;
