import { ModuleWithProviders, NgModule } from '@angular/core';
import { getWebRTCConfigProvider } from './config/config/webrtc.config';
import { WebRTCConfig } from './config/config/webrtc.interface';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class CiWebrtcModule {
  static forRoot(conf: WebRTCConfig): ModuleWithProviders<CiWebrtcModule> {
    return {
      ngModule: CiWebrtcModule,
      providers: [getWebRTCConfigProvider(conf)],
    };
  }
}
