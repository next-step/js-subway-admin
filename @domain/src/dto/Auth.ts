export interface AuthResponse {
  token: string
}

export interface AuthRequest {
  email: string;
  password: string;
}