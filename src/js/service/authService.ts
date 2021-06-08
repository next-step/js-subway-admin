import LocalStorage from "@/core/localStorage";
import { MESSAGE, PATH } from "@/constants";
import { authStore } from "@/store";
import router from "@/router";

interface IAuthDB {
  id: string;
  email: string;
  password: string;
}

const authDB = new LocalStorage<IAuthDB>("auth");

const authService = {
  login: (email: string, password: string) => {
    try {
      const user = authDB.get(email);
      if (!user) throw MESSAGE.NO_USER;
      if (user.password !== password) throw MESSAGE.WRONG_PASSWORD;
      const state = authStore.getState();
      authStore.updateState({ ...state, isLoggedIn: true });
      router.push(PATH.STATIONS);
    } catch (error) {
      alert(error);
    }
  },

  signUp: (email: string, password: string, repeatPassword: string) => {
    try {
      const users = authDB.getAll();
      // 중복체크
    } catch (error) {
      alert(error);
    }
  },
};

export default authService;
