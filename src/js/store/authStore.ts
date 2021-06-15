import Store from "@/core/store";
import { authService } from "@/service";
import { actions } from "@/actions/auth";

interface IState {
  login_loading: boolean;
  login_success: boolean;
  login_error: string | null;

  signUp_loading: boolean;
  signUp_success: boolean;
  signUp_error: string | null;

  logout_loading: boolean;
  logout_success: boolean;
  logout_error: string | null;

  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
}

const initialState = {
  login_loading: false,
  login_success: false,
  login_error: null,

  signUp_loading: false,
  signUp_success: false,
  signUp_error: null,

  logout_loading: false,
  logout_success: false,
  logout_error: null,

  isLoggedIn: false,
  user: null,
};

class AuthStore extends Store<IState> {
  protected mutations = {
    [actions.SIGNUP_REQUEST]: ({ datas }) => {
      this.setState({
        ...this.state,
        signUp_loading: true,
        signUp_success: false,
        signUp_error: null,
      });
      authService.signUp(datas);
    },
    [actions.SIGNUP_SUCCESS]: () => {
      this.setState({
        ...this.state,
        signUp_loading: false,
        signUp_success: true,
      });
    },
    [actions.SIGNUP_FAILURE]: ({ error }) => {
      this.setState({
        ...this.state,
        signUp_loading: false,
        signUp_error: error,
      });
    },
    [actions.LOGIN_REQUEST]: ({ datas }) => {
      this.setState({
        ...this.state,
        login_loading: true,
        login_success: false,
        login_error: null,
      });
      authService.login(datas);
    },
    [actions.LOGIN_SUCCESS]: ({ datas }) => {
      this.setState({
        ...this.state,
        login_loading: false,
        login_success: true,
        isLoggedIn: true,
        user: datas,
      });
    },
    [actions.LOGIN_FAILURE]: ({ error }) => {
      this.setState({
        ...this.state,
        login_loading: false,
        login_error: error,
      });
    },
    [actions.LOGOUT_REQUEST]: () => {
      this.setState({
        ...this.state,
        logout_loading: true,
        logout_success: false,
        logout_error: null,
      });
      // 서비스에 요청 보낸다.
    },
    [actions.LOGOUT_SUCCESS]: () => {
      this.setState({
        ...this.state,
        logout_loading: false,
        logout_success: true,
        isLoggedIn: false,
        user: null,
      });
    },
    [actions.LOGOUT_FAILURE]: ({ error }) => {
      this.setState({
        ...this.state,
        logout_loading: false,
        logout_error: error,
      });
    },
  };
}

const authStore = new AuthStore(initialState);

export default authStore;
