import Component from "@/core/component";
import router from "@/router";
import { Header, Modal } from "@/components";
import { authStore, uiStore } from "@/store";
import { PATH } from "@/constants";

class App extends Component {
  constructor() {
    super();
    router.push(PATH.STATIONS);
  }

  protected initChildren(): void {
    const header = new Header();
    const modal = new Modal();
    this.children = [header, modal];
  }
}

export default App;
