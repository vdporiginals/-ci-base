import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonConfig } from './config/common-config.interface';
import { getCommonConfigProvider } from './config/common.config';
import { CiTableComponent } from './ui/ci-table/ci-table.component';

@NgModule({
  providers: [],
  declarations: [

  ],
})
export class CiCommonModule {
  static forRoot(conf: CommonConfig): ModuleWithProviders<CiCommonModule> {
    return {
      ngModule: CiCommonModule,
      providers: [getCommonConfigProvider(conf)],
    };
  }
}
