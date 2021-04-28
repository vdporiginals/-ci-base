import { InjectionToken, ValueProvider } from '@angular/core';
import { AuthConfig } from './auth-config.interface';
import { PolicyConfig } from './policy-config.interface';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('ci-auth.config');

export const getAuthConfigProvider = (value: AuthConfig): ValueProvider => ({
  provide: AUTH_CONFIG,
  useValue: value,
});

export const POLICY_CONFIG = new InjectionToken<PolicyConfig>(
  'ci-policy.config'
);

export const getPolicyConfigProvider = (
  value: typeof POLICY_CONFIG
): ValueProvider => ({
  provide: POLICY_CONFIG,
  useValue: value,
});
