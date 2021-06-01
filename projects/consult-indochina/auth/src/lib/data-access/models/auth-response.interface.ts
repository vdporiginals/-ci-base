import { UserInterface } from './user.model';

export interface AuthState {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  ExpireDate: string;
  NewDeviceMetadata: string;
  RefreshToken: string;
  RefreshTokenExpiresIn: number;
  user: UserInterface;
  TokenType: string;
}

export interface LoginData {
  Username: string;
  Password: string;
}
