import Component from "@/core/component";
import Header from "@/components/Header";
import router from "@/router";
import { authStore } from "@/store";
import { PATH } from "@/constants";

class App extends Component {
  $header: Component = {} as Component;

  protected initChildren(): void {
    this.$header = new Header();
    authStore.addObserver(this.$header);
  }

  protected beforeComponentMount() {
    router.push(PATH.STATIONS);
  }
}

export default App;
