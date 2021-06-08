import Component from "@/core/component";
import authService from "@/service/authService";
import { PAGE_TITLE } from "@/constants";
import { IPageInfo } from "@/types";
import { authStore } from "@/store";
import { $ } from "@/utils/dom";
import view from "./view";

class SignUp extends Component {
  protected initDom(): void {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected beforeChangeURL(): boolean {
    const { isLoggedIn } = authStore.getState();
    if (isLoggedIn) return false;
    return true;
  }

  public bindEvents(): void {
    const $form = $("#signup-form");

    $form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const email = $("#email", $form) as HTMLInputElement;
      const name = $("#name", $form) as HTMLInputElement;
      const password = $("#password", $form) as HTMLInputElement;
      const confirmPassword = $("#password-confirm") as HTMLInputElement;
      authService.signUp(
        email.value,
        name.value,
        password.value,
        confirmPassword.value
      );
    });
  }

  public render(): IPageInfo {
    if (!this.beforeChangeURL()) return;
    return {
      title: PAGE_TITLE.LOGIN,
      contents: this.$container.outerHTML,
    };
  }
}

export default SignUp;
