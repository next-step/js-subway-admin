import Component from "@/core/component";
import view from "./view";
import { authService } from "@/service";
import { $, createElement } from "@/utils/dom";

class SignUpForm extends Component {
  protected initDom(): void {
    this.$container = createElement({
      tag: "form",
      className: "form",
      id: "signup-form",
    });
  }

  protected componentMount(): void {
    this.$container.innerHTML = view;
  }

  protected bindEvents(): void {
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
}

export default SignUpForm;
