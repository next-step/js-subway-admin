const view = (isLoggedIn: boolean): string => {
  return `<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="/pages/stations.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/pages/lines.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/pages/sections.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  ${
    isLoggedIn
      ? `로그아웃`
      : `  <a href="/pages/login.html" class="my-1">
  <button class="btn bg-white shadow mx-1">👤 로그인</button>
</a>`
  }
</nav>`;
};

export default view;
