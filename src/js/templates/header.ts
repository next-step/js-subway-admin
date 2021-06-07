const headerTemplate = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold poiner-events-none">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="/stations" class="my-1">
    <button class="btn poiner-events-none bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/lines" class="my-1">
    <button class="btn poiner-events-none bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/sections" class="my-1">
    <button class="btn poiner-events-none bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="/login" class="my-1">
    <button class="btn poiner-events-none bg-white shadow mx-1">👤 로그인</button>
  </a>
</nav>`;

export default headerTemplate;
