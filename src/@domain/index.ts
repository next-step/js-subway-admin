export interface User {
  idx: number;
  email: string;
  name: string;
  password: string;
}

export interface UserRequest extends User {
  repeatPassword: string;
}

export interface Auth {
  idx: number;
  email: string;
  name: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}
