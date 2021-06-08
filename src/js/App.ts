import Component from "@/core/component";
import router from "@/router";
import { Header, Modal } from "@/components";
import { authStore, uiStore } from "@/store";
import { PATH } from "@/constants";

class App extends Component {
  protected initChildren(): void {
    const header = new Header();
    const modal = new Modal();
    authStore.addObserver(header);
    uiStore.addObserver(modal);
  }

  protected beforeComponentMount() {
    router.push(PATH.STATIONS);
  }
}

export default App;
