import {Component} from "~@core";
import {router} from "~router";

export class RouterLink extends Component {

  protected setup() {
    this.checkSelect();
  }

  protected template(): string {
    return this.$target.innerHTML;
  }

  protected updated() {
    this.checkSelect();
  }

  protected setEvent() {
    const $target = this.$target as HTMLAnchorElement;
    $target.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      router.push($target.href);
    });

    window.addEventListener('popstate', () => this.checkSelect());
  }

  private checkSelect() {
    const $target = this.$target as HTMLAnchorElement;
    const path = $target.href.replace(location.origin, '');

    const isSelected = new RegExp(
      `^${path.replace(/:\w+/gi, '\\w+').replace(/\//, "\\/")}$`,
      'g'
    ).test(router.path);

    if (isSelected) {
      $target.classList.add('is-active-link');
    } else {
      $target.classList.remove('is-active-link');
    }
  }

}
