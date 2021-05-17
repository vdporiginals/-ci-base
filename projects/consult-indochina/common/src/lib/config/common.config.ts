import { InjectionToken, ValueProvider } from '@angular/core';
import { CommonConfig } from './common-config.interface';

export const COMMON_CONFIG = new InjectionToken<CommonConfig>('ci-common.config');

export const getCommonConfigProvider = (value: CommonConfig): ValueProvider => ({
  provide: COMMON_CONFIG,
  useValue: value,
});
