import LocalStorage from "@/core/localStorage";
import { MESSAGE, PATH } from "@/constants";
import { authStore } from "@/store";
import router from "@/router";

interface IAuthDB {
  id: string;
  email: string;
  name: string;
  password: string;
}

const authDB = new LocalStorage<IAuthDB>("auth");

const authService = {
  login: (email: string, password: string): void => {
    try {
      const user = authDB.get(email);
      if (!user) throw MESSAGE.NO_USER;
      if (user.password !== password) throw MESSAGE.WRONG_PASSWORD;
      authStore.updateState({ isLoggedIn: true });
      router.push(PATH.STATIONS);
    } catch (error) {
      alert(error);
    }
  },

  signUp: (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ): void => {
    try {
      const users = authDB.getAll();
      const isExisitedEmail =
        users.findIndex((user) => user.id === email) !== -1;
      if (isExisitedEmail) throw MESSAGE.EXIST_EMAIL;
      if (password !== confirmPassword) throw MESSAGE.NOT_CORRECT_PASSWORD;
      authDB.add({ id: email, email, name, password });
      alert(MESSAGE.SIGNUP_SUCCESS);
      router.push(PATH.LOGIN);
    } catch (error) {
      alert(error);
    }
  },

  logout: (): void => {
    authStore.updateState({ isLoggedIn: false });
    router.push(PATH.STATIONS);
  },
};

export default authService;
