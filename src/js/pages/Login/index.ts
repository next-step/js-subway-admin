import Component from "@/core/component";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { $ } from "@/utils/dom";
import view from "./view";
import handleLink from "@/router/handleLink";

class Login extends Component {
  $loginForm: Component = {} as Component;

  protected initDom(): void {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected initview() {
    this.$container.innerHTML = ``;
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  public bindEvents(): void {
    const $form = $("#login-form");
    $form.addEventListener("click", handleLink);
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  public render(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LOGIN,
      contents: this.$container.outerHTML,
    };
  }
}

export default Login;
