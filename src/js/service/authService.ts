import router from "@/router";
import { ILoginUser, ISignUpUser } from "@/types";
import { MESSAGE, PATH } from "@/constants";
import { authDB } from "@/data";
import { authStore } from "@/store";
import {
  NO_USER_ERROR,
  WRONG_PASSWORD_ERROR,
  DUPLICATED_EMAIL_ERROR,
  NOT_CORRECT_PASSWORD_ERROR,
} from "@/errors";

const authService = {
  login: ({ email, password }: ILoginUser): void => {
    const user = authDB.get(email);
    if (!user) throw NO_USER_ERROR;
    if (user.password !== password) throw WRONG_PASSWORD_ERROR;
    authStore.updateState({ isLoggedIn: true });
    router.push(PATH.STATIONS);
  },

  signUp: ({ email, name, password, confirmPassword }: ISignUpUser): void => {
    const users = authDB.getAll();
    const isExisitedEmail = users.findIndex((user) => user.id === email) !== -1;
    if (isExisitedEmail) throw DUPLICATED_EMAIL_ERROR;
    if (password !== confirmPassword) throw NOT_CORRECT_PASSWORD_ERROR;

    authDB.add({ id: email, email, name, password });
    alert(MESSAGE.SIGNUP_SUCCESS);
    router.push(PATH.LOGIN);
  },

  logout: (): void => {
    authStore.updateState({ isLoggedIn: false });
    router.push(PATH.STATIONS);
  },
};

export default authService;
