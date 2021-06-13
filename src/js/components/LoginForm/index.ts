import Component from "@/core/component";
import handleLink from "@/router/handleLink";
import { ILoginUser, LoginEnum } from "@/types";
import { authService } from "@/service";
import { newElement, formData } from "@/utils/dom";

class LoginForm extends Component {
  protected initDom(): void {
    this.$container = newElement(`<form class="form" id="login-form"/>`);
  }

  protected bindEvents(): void {
    this.$container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const userData = formData<ILoginUser>(this.$container, LoginEnum);
      authService.login(userData);
    });

    this.$container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.id === "link") handleLink(e);
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
    <div class="input-control w-100">
      <button
        type="submit"
        name="submit"
        class="input-submit w-100 bg-cyan-300"
        >
        확인
      </button>
    </div>
    <p class="text-gray-700 pl-2">
      아직 회원이 아니신가요?
      <a href="/signup" id="link">회원가입</a>
    </p>`;
  }
}

export default LoginForm;
