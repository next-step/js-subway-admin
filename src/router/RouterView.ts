import {Component} from "~@core";
import {router} from "~router";
import {authStore} from "~store";
import * as pages from "~pages";


export class RouterView extends Component {
  protected template(): string {
    const { route } = router;
    if (route === 'NotFound') {
      return `
        <main class="mt-10 d-flex justify-center">
          페이지를 찾을 수 없습니다.        
        </main>
      `
    }
    return `<main class="mt-10 d-flex justify-center" data-component="${router.route}"></main>`;
  }

  protected mounted() {
    router.beforeRouterUpdate(() => {
      if (['/login', '/signup'].includes(router.path) || authStore.$state.authentication) return;
      alert('지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.');
      router.push('/login');
    });
    router.setup();
  }

  protected initChildComponent(el: HTMLElement, componentName: 'StationsPage' | 'SectionsPage' | 'LinesPage' | 'LoginPage' | 'SignUpPage' | 'MyPage') {
    return new pages[componentName](el);
  }
}
