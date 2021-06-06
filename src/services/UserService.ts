import {authRepository, AuthRepository, userRepository, UserRepository} from "~repositories";
import {Auth, AuthRequest, User, UserRequest} from "~@domain";
import {ExistedUserError, InvalidCredentialError} from "~exceptions";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  private getUsers(): User[] {
    return this.userRepository.get() || [];
  }

  public getAuth(): Auth | null {
    return this.authRepository.get() || null;
  }

  public signUp(request: UserRequest): void {
    const users: User[] = this.getUsers();
    const { repeatPassword, ...user } = request;
    const existed = users.find(v => v.email === user.email);
    if (existed) {
      throw new ExistedUserError();
    }
    this.userRepository.set([
      ...users,
      user
    ]);
  }

  public signIn({ email, password }: AuthRequest): Auth {
    const users: User[] = this.getUsers();
    const user = users.find(v => v.email === email && v.password === password);
    if (!user) {
      throw new InvalidCredentialError();
    }
    const { password: p, ...auth } = user;
    this.authRepository.set(auth);

    return auth;
  }
}

export const userService = new UserService(userRepository, authRepository);

