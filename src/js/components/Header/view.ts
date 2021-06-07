const view = (isLoggedIn: boolean): string => {
  return `
    <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
    <nav class="d-flex justify-center flex-wrap">
        <button class="btn bg-white shadow mx-1" id="station">🚉 역 관리</button>
        <button class="btn bg-white shadow mx-1" id="lines">🛤️ 노선 관리</button>
        <button class="btn bg-white shadow mx-1" id="sectons">🔁 구간 관리</button>
        ${
          isLoggedIn
            ? `<button class="btn bg-white shadow mx-1" id="login">👤 로그인</button>`
            : `<button class="btn bg-white shadow mx-1" id="logout">👤 로그아웃</button>`
        }
    </nav>`;
};
