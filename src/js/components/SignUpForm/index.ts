import Component from "@/core/component";
import authService from "@/service/authService";
import view from "./view";
import { $, createElement } from "@/utils/dom";

class SignUpForm extends Component {
  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  public bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const email = $("#email", this.$container) as HTMLInputElement;
      const name = $("#name", this.$container) as HTMLInputElement;
      const password = $("#password", this.$container) as HTMLInputElement;
      const confirmPassword = $("#password-confirm") as HTMLInputElement;
      authService.signUp(
        email.value,
        name.value,
        password.value,
        confirmPassword.value
      );
    });
  }

  public render(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "signup-form",
    });
    this.$root.appendChild(this.$container);
    this.componentMount();
    this.bindEvents();
  }
}

export default SignUpForm;
