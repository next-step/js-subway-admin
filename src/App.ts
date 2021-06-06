import {Component} from "~@core";
import {Header} from "~components/layouts/Header";
import subwayEmoji from './assets/images/subway_emoji.png';
import {router} from "~router";

interface AppState {
  auth: boolean;
}

export class App extends Component<AppState> {

  private get NoAuth() {
    return `
      <main class="mt-10 d-flex justify-center">
        <div class="d-flex flex-col">
          <div class="d-flex justify-center">
            <img src="${subwayEmoji}" alt="로그인이 필요합니다." width="200" />
          </div>
          <p class="mt-0 text-center">
            지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.
          </p>
        </div>
      </main>
    `
  }

  protected setup() {
    this.$state = {
      auth: false,
    }
  }

  protected template(): string {
    const { auth } = this.$state;
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4" data-component="Header"></header>
          <main class="mt-10 d-flex justify-center" data-component="Router"></main>
        </div>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'Header') {
      return new Header(el);
    }
  }

  protected mounted() {
    router.beforeRouterUpdate(() => {
      if (router.path.includes('login') || this.$state.auth) return;
      alert('지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.');
      router.push('/login');
    });
    router.setup();
  }
}