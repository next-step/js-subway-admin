import {Component} from "~@core";
import {router} from "~router";

export class RouterLink extends Component {

  protected template(): string {
    return this.$target.innerHTML;
  }

  protected setEvent() {
    this.addEvent('click', (event: MouseEvent) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      router.push(target.href);
    });
  }

}
