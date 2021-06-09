import Store from "@/core/store";

interface IState {
  isLoggedIn: boolean;
}

class AuthStore extends Store<IState> {
  protected initState(): void {
    this.state = { isLoggedIn: false };
  }
}

const authStore = new AuthStore();

export default authStore;
