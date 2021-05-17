import { InjectionToken, Provider, ValueProvider } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenProvider, WebSocketConfig } from './websocket.interface';

export const WEBSOCKET_CONFIG = new InjectionToken<WebSocketConfig>(
  'ci-websocket.config'
);
export const ACCESS_TOKEN_PROVIDER = new InjectionToken<Observable<any>>(
  'A stream with current organization information'
);

export const getWSConfigProvider = (
  val1: WebSocketConfig,
  val2: Provider
): Provider[] => [
  {
    provide: WEBSOCKET_CONFIG,
    useValue: val1,
  },
  val2,
];
