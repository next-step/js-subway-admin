import {Store} from "~@core";
import {Auth, AuthRequest} from "~@domain";
import {userService} from "~services";

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const LOAD_AUTHENTICATION = 'LOAD_AUTHENTICATION';

interface AuthState {
  authentication: Auth | null;
}

export const authStore = new Store<AuthState>({
  state: {
    authentication: null,
  },

  mutations: {
    [SET_AUTHENTICATION] (state: AuthState, authentication: Auth | null) {
      state.authentication = authentication;
    },
  },

  actions: {
    [SIGN_IN] ({ commit }, authRequest: AuthRequest) {
      const authentication = userService.signIn(authRequest);
      commit(SET_AUTHENTICATION, authentication);
    },

    [SIGN_UP] () {
    },

    [LOAD_AUTHENTICATION] ({ commit }) {
      commit(SET_AUTHENTICATION, userService.getAuth());
    },
  },
});
