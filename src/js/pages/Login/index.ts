import Component from "@/core/component";
import view from "@/pages/Login/view";
import PAGE_TITLE from "@/constants/pageTitle";

class Login extends Component {
  protected beforeComponentMount() {
    // 로그인 여부 확인해서 로그인되어있으면 리다이렉트
  }

  protected initDom() {
    this.$container = document.createElement("div");
    this.$container.className = "wrapper p-10 bg-white";
  }

  protected bindEvents() {}

  public render() {
    return {
      title: PAGE_TITLE.LOGIN,
      contents: { main: view },
    };
  }
}

export default Login;
