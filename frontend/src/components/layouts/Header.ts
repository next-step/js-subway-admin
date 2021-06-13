import {Component} from "@/_core";
import {authStore, SIGN_OUT} from "@/store";
import {router, RouterLink} from "@/router";

export class Header extends Component {
  protected template(): string {
    return `      
      <a href="/" class="text-black" data-component="RouterLink">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        ${authStore.$state.authentication ? `
          <a href="/stations" class="my-1" data-component="RouterLink">
            <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
          </a>
          <a href="/lines" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">🛤️ 노선 관리</span>
          </a>
          <a href="/sections" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">🔁 구간 관리</span>
          </a>
          <a href="#" class="my-1 logout">
            <span class="btn bg-white shadow mx-1">🔗 로그아웃</span>
          </a>
        ` : `
          <a href="/login" class="my-1" data-component="RouterLink">
            <span class="btn bg-white shadow mx-1">👤 로그인</span>
          </a>
        `}
      </nav>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RouterLink') {
      return new RouterLink(el);
    }
  }

  protected setEvent() {
    this.addEvent('click', '.logout', (event: Event) => {
      event.preventDefault();
      alert('로그아웃 되었습니다.');
      router.push('/login');
      authStore.dispatch(SIGN_OUT);
    })
  }
}