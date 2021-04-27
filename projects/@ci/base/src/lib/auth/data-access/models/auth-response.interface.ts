export interface AuthResponse {
  AccessToken: string;
  ExpiresIn: string;
  IdToken: string;
  NewDeviceMetadata: string;
  RefreshToken: string;
  TokenType: string;
}

export interface LoginData {
  Username: string;
  Password: string;
}
