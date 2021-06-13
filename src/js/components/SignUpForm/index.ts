import Component from "@/core/component";
import { authService } from "@/service";
import { $, newElement } from "@/utils/dom";

class SignUpForm extends Component {
  protected initDom(): void {
    this.$container = newElement(`<form class="form" id="signup-form"/>`);
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

  protected componentMount(): void {
    this.$container.innerHTML = `
    <div class="input-control">
      <label for="email" class="input-label" hidden>이메일</label>
      <input
        type="email"
        id="email"
        name="email"
        class="input-field"
        placeholder="이메일"
        required
      />
    </div>
    <div class="input-control">
      <label for="name" class="input-label" hidden>이름</label>
      <input
        type="text"
        id="name"
        name="name"
        class="input-field"
        placeholder="이름"
        required
      />
    </div>
    <div class="input-control">
      <label for="password" class="input-label" hidden
        >비밀번호</label
      >
      <input
        type="password"
        id="password"
        name="password"
        class="input-field"
        placeholder="비밀번호"
      />
    </div>
    <div class="input-control">
      <label for="password-confirm" class="input-label" hidden
        >비밀번호 확인</label
      >
      <input
        type="password"
        id="password-confirm"
        name="password-confirm"
        class="input-field"
        placeholder="비밀번호 확인"
      />
    </div>
    <div class="input-control">
      <button
        name="submit"
        class="input-submit w-100 bg-cyan-300"
      >
        확인
      </button>
    </div>
    `;
  }
}

export default SignUpForm;
