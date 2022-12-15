export interface AuthResponse {
  token?: string;
}

export interface TokenValidation {
  username?: string;
  roles?: string;
}

export interface Usuario {
  username: string;
  password: string;
}
