import { InjectionToken, ValueProvider } from '@angular/core';
import { WebSocketConfig } from './websocket.interface';

export const WEBSOCKET_CONFIG = new InjectionToken<WebSocketConfig>(
  'ci-websocket.config'
);

export const getWSConfigProvider = (value: WebSocketConfig): ValueProvider => ({
  provide: WEBSOCKET_CONFIG,
  useValue: value,
});
