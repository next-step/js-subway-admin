import Component from "@/core/component";
import handleLink from "@/router/handleLink";

class LoginForm extends Component {
  constructor(readonly $root: HTMLElement) {
    super();
    this.mount();
  }

  protected initDom() {
    this.$container = document.createElement("form");
    this.$root.appendChild(this.$container);
  }

  protected bindEvents() {
    this.$container.addEventListener("click", handleLink);
    this.$container.addEventListener("submit", () => {});
  }

  protected componentMount() {
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
        <a href="/pages/signup.html">회원가입</a>
      </p>
        `;
  }
}

export default LoginForm;
