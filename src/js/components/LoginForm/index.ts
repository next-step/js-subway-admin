import Component from "@/core/component";
import authService from "@/service/authService";
import view from "./view";
import handleLink from "@/router/handleLink";
import { $, createElement } from "@/utils/dom";

class LoginForm extends Component {
  public bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const email = $("#email", this.$container) as HTMLInputElement;
      const password = $("#password", this.$container) as HTMLInputElement;
      authService.login(email.value, password.value);
    });

    $("#link", this.$container).addEventListener("click", handleLink);
  }

  public componentMount(): void {
    this.$container.innerHTML = view;
  }

  public render(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "login-form",
    });
    this.$root.appendChild(this.$container);
    this.componentMount();
    this.bindEvents();
  }
}

export default LoginForm;
