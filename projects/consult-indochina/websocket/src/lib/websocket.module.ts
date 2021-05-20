import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { getWSConfigProvider } from './config/websocket.config';
import {
  AccessTokenProvider,
  WebSocketConfig,
} from './config/websocket.interface';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class CiWebsocketModule {
  static forRoot(
    conf: WebSocketConfig,
    val: Provider
  ): ModuleWithProviders<CiWebsocketModule> {
    return {
      ngModule: CiWebsocketModule,
      providers: [getWSConfigProvider(conf, val)],
    };
  }
}
