import { ModuleWithProviders, NgModule } from '@angular/core';
import { getWSConfigProvider } from './config/websocket.config';
import { WebSocketConfig } from './config/websocket.interface';
import { FbChatDesignComponent } from './ui/fb-chat-design/fb-chat-design.component';

@NgModule({
  declarations: [
  ],
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
