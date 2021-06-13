import Component from "@/core/component";
import handleLink from "@/router/handleLink";
import { authService } from "@/service";
import { authStore } from "@/store";
import { $ } from "@/utils/dom";

class Header extends Component {
  protected initDom() {
    this.$container = $("#header");
  }

  protected bindEvents(): void {
    this.rootEvent("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target.id !== "logout") {
      handleLink(e);
      return;
    }
    authService.logout();
  }

  protected componentMount(): void {
    const { isLoggedIn } = authStore.getState();
    this.$container.innerHTML = `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
     </a>
    <nav class="d-flex justify-center flex-wrap">
    ${
      isLoggedIn
        ? `
    <a href="/" class="my-1">
      <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
    </a>
    <a href="/lines" class="my-1">
      <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
    </a>`
        : ""
    }
      ${
        isLoggedIn
          ? `
      <div class="my-1">
        <button class="btn bg-white shadow mx-1" id="logout">🔓 로그아웃</button>
      </div>
      `
          : `<a href="/login" class="my-1">
        <button class="btn bg-white shadow mx-1">👤 로그인</button>
      </a>`
      }
    </nav>
      `;
  }
}

export default Header;
