import Component from "@/core/component";
import Header from "@/components/Header";
import router from "@/router";
import { PATH } from "@/constants";

class App extends Component {
  $header: Component = {} as Component;

  protected initChildren(): void {
    this.$header = new Header();
  }

  protected beforeComponentMount() {
    router.push(PATH.STATIONS);
  }
}

export default App;
