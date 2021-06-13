import {Store} from "@/_core";
import {AuthResponse, AuthRequest, UpdateUserRequest} from "subway-domain";
import {authService} from "@/services";

export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOAD_AUTHENTICATION = 'LOAD_AUTHENTICATION';
export const UPDATE_USER = 'UPDATE_USER';

interface AuthState {
  authentication: AuthResponse | null;
}

export const authStore = new Store<AuthState>({
  state: {
    authentication: null,
  },

  mutations: {
    [SET_AUTHENTICATION] (state: AuthState, authentication: AuthResponse | null) {
      state.authentication = authentication;
    },
  },

  actions: {
    async [SIGN_IN] ({ commit }, authRequest: AuthRequest) {
      const authentication = await authService.login(authRequest);
      commit(SET_AUTHENTICATION, authentication);
    },

    [SIGN_OUT] ({ commit }) {
      authService.logout();
      commit(SET_AUTHENTICATION, null);
    },

    [LOAD_AUTHENTICATION] ({ commit }) {
      commit(SET_AUTHENTICATION, authService.getAuth());
    },

    [UPDATE_USER] ({ dispatch }, request: UpdateUserRequest) {
      // authService.updateUser(request);
      // dispatch(LOAD_AUTHENTICATION);
    }
  },
});
