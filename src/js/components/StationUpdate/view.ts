const view = (currentValue: string) => `
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
  value=${currentValue}
  required
/>
<button
  name="submit"
  class="input-submit bg-cyan-300 ml-2"
>
  수정
</button>
</div>

`;

export default view;
