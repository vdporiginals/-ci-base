import { ModuleWithProviders, NgModule } from '@angular/core';
import { getWSConfigProvider } from './config/config/websocket.config';
import { WebSocketConfig } from './config/config/websocket.interface';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class CiWebsocketModule {
  static forRoot(
    conf: WebSocketConfig
  ): ModuleWithProviders<CiWebsocketModule> {
    return {
      ngModule: CiWebsocketModule,
      providers: [getWSConfigProvider(conf)],
    };
  }
}
