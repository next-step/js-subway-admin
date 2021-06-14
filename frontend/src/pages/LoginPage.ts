import {Component} from "@/_core";
import {AuthRequest} from "subway-domain";
import {parseFormData} from "@/utils";
import {authStore, SIGN_IN} from "@/store";
import {router, RouterLink} from "@/router";

import '../assets/css/pages/auth.css';

export class LoginPage extends Component {
  protected template(): string {
    return `
      <div class="wrapper p-10 bg-white auth">
        <div class="heading">
          <h2>👋🏼 로그인</h2>
        </div>
        <form name="login" class="form">
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
              class="input-submit w-100 bg-cyan-300"
            >
              확인
            </button>
          </div>
          <p class="text-gray-700 pl-2">
            아직 회원이 아니신가요?
            <a href="/signup" data-component="RouterLink">회원가입</a>
          </p>
        </form>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RouterLink') {
      return new RouterLink(el);
    }
  }

  protected setEvent() {
    this.addEvent('submit', 'form', async (event: Event) => {
      event.preventDefault();

      const request = parseFormData<AuthRequest>(event.target as HTMLFormElement);
      try {
        await authStore.dispatch(SIGN_IN, request);
        alert('로그인이 완료되었습니다.');
        router.push('/stations');
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    });
  }
}
