import { UserInterface } from './user.model';

export interface AuthState {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  NewDeviceMetadata: string;
  RefreshToken: string;
  refreshTokenExpiresIn: number;
  // user: UserInterface | null;
  TokenType: string;
}

export interface LoginData {
  Username: string;
  Password: string;
}
