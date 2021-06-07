import Component from "@/core/component";
import view from "./view";
import { $ } from "@/utils/dom";

class Header extends Component {
  protected initDom() {
    this.$container = $("#header");
  }

  protected componentMount() {
    this.$container.innerHTML = view(false);
  }
}

export default Header;
