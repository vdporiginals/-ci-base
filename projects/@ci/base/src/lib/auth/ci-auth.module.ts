import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from './config/auth-config.interface';
import { getAuthConfigProvider } from './config/auth.config';

@NgModule({
  providers: [],
})
export class CiAuthModule {
  static forRoot(conf: AuthConfig): ModuleWithProviders<CiAuthModule> {
    return {
      ngModule: CiAuthModule,
      providers: [getAuthConfigProvider(conf)],
    };
  }
}
