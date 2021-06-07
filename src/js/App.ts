import Component from "@/core/component";
import Header from "@/components/Header";
import router from "@/router";
import { PATH, MESSAGE } from "@/constants";

class App extends Component {
  protected initChildren() {
    new Header();
  }

  protected beforeComponentMount() {
    alert(MESSAGE.LOGIN_REQUIRED);
    router.push(PATH.LOGIN);
  }
}

export default App;
