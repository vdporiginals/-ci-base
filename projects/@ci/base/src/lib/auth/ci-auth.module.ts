import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from './config/auth-config.interface';
import { getAuthConfigProvider } from './config/auth.config';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

@NgModule({
  providers: [],
  declarations: [],
})
export class CiAuthModule {
  static forRoot(conf: AuthConfig): ModuleWithProviders<CiAuthModule> {
    return {
      ngModule: CiAuthModule,
      providers: [getAuthConfigProvider(conf)],
    };
  }
}
