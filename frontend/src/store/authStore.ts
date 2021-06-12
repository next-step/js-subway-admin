import {Store} from "~@core";
import {Auth, AuthRequest, UpdateUserRequest} from "~@domain";
import {userService} from "~services";

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOAD_AUTHENTICATION = 'LOAD_AUTHENTICATION';
export const UPDATE_USER = 'UPDATE_USER';

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

    [SIGN_OUT] ({ commit }) {
      userService.signOut();
      commit(SET_AUTHENTICATION, null);
    },

    [LOAD_AUTHENTICATION] ({ commit }) {
      commit(SET_AUTHENTICATION, userService.getAuth());
    },

    [UPDATE_USER] ({ dispatch }, request: UpdateUserRequest) {
      userService.updateUser(request);
      dispatch(LOAD_AUTHENTICATION);
    }
  },
});
