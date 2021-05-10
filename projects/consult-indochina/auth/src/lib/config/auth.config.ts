import { InjectionToken, ValueProvider } from '@angular/core';
import { AuthConfig } from './auth-config.interface';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('ci-auth.config');

export const getAuthConfigProvider = (value: AuthConfig): ValueProvider => ({
  provide: AUTH_CONFIG,
  useValue: value,
});
