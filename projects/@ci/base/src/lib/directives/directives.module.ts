import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  declarations: [OnlyNumberDirective],
  imports: [CommonModule],
  exports: [OnlyNumberDirective],
})
export class CiDirectiveModule {}
