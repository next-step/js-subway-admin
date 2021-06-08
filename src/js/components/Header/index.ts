import Component from "@/core/component";
import handleLink from "@/router/handleLink";
import view from "./view";
import { authService } from "@/service";
import { authStore } from "@/store";
import { $ } from "@/utils/dom";

class Header extends Component {
  constructor() {
    super();
    this.bindEvents();
  }
  protected initDom() {
    this.$container = $("#header");
  }

  protected bindEvents(): void {
    this.$container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.id !== "logout") {
        handleLink(e);
        return;
      }
      authService.logout();
    });
  }

  protected componentMount(): void {
    const { isLoggedIn } = authStore.getState();
    this.$container.innerHTML = view(isLoggedIn);
  }
}

export default Header;
