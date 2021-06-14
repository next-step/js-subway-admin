import Component from "@/core/component";
import handleLink from "@/router/handleLink";
import { LOGIN_REQUEST } from "@/actions/auth";
import { CLIENT_ERROR } from "@/errors";
import { ILoginUser, LoginEnum } from "@/types";
import { authStore } from "@/store";
import { newElement, formData } from "@/utils/dom";

class LoginForm extends Component {
  protected initDom(): void {
    this.$container = newElement(`<form class="form" id="login-form"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("submit", this.handleSubmit.bind(this));
    this.rootEvent("click", this.handleClickLink.bind(this));
  }

  protected handleSubmit(e: Event): void {
    e.preventDefault();
    const userData = formData<ILoginUser>(this.$container, LoginEnum);
    authStore.dispatch(LOGIN_REQUEST(userData));
  }

  private handleClickLink(e: Event): void {
    try {
      const target = e.target as HTMLElement;
      if (target.id === "link") handleLink(e);
    } catch (error) {
      if (!error) error = CLIENT_ERROR;
      alert(error.message);
    }
  }

  protected render(): void {
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
