import Component from "@/core/component";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { $ } from "@/utils/dom";
import authService from "@/service/authService";
import view from "./view";
import handleLink from "@/router/handleLink";

class Login extends Component {
  $loginForm: Component = {} as Component;

  protected initDom(): void {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  public bindEvents(): void {
    const $form = $("#login-form");
    const $link = $("#link");

    $form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const email = $("#email", $form) as HTMLInputElement;
      const password = $("#password", $form) as HTMLInputElement;
      authService.login(email.value, password.value);
    });
    $link.addEventListener("click", handleLink);
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
