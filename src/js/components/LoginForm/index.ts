import Component from "@/core/component";
import view from "./view";
import handleLink from "@/router/handleLink";
import { authService } from "@/service";
import { $, createElement } from "@/utils/dom";

class LoginForm extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "login-form",
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const email = $("#email", this.$container) as HTMLInputElement;
      const password = $("#password", this.$container) as HTMLInputElement;
      authService.login(email.value, password.value);
    });

    $("#link", this.$container).addEventListener("click", handleLink);
  }

  public render(): void {
    this.$root.appendChild(this.$container);
    this.componentMount();
  }
}

export default LoginForm;
