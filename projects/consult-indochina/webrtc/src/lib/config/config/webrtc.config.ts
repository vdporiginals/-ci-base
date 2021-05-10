import { InjectionToken, ValueProvider } from '@angular/core';
import { WebRTCConfig } from './webrtc.interface';

export const WEBRTC_CONFIG = new InjectionToken<WebRTCConfig>(
  'ci-webrtc.config'
);

export const getAuthConfigProvider = (value: WebRTCConfig): ValueProvider => ({
  provide: WEBRTC_CONFIG,
  useValue: value,
});
