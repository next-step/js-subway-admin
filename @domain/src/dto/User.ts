export interface UserResponse {
  idx: number;
  email: string;
  name: string;
  password: string;
}

export interface UserRequest {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export interface UpdateUserRequest {
  idx: number;
  email: string;
  name: string;
}
