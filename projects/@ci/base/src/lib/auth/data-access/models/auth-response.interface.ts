export interface AuthResponse {
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
