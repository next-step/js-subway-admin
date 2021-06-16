import {Component} from "@/_core";
import {router} from "@/router";

export class RouterLink extends Component {

  protected setup() {
    this.checkSelect();
  }

  protected updated() {
    this.checkSelect();
  }

  protected template(): string {

    // observer를 위함
    router.route;

    return this.$target.innerHTML;
  }

  protected setEvent() {
    const $target = this.$target as HTMLAnchorElement;
    $target.addEventListener('click', (event: Event) => {
      event.preventDefault();
      router.push($target.href);
    });
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
