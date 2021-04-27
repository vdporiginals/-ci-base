export interface AuthState {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  NewDeviceMetadata: string;
  RefreshToken: string;
  TokenType: string;
}

export interface LoginData {
  Username: string;
  Password: string;
}
