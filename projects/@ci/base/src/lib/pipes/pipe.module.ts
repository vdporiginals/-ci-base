import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { currencyShortPipe } from './currency-short.pipe';
import { sumTotalPipe } from './sum-total.pipe';
import { TextOverflowPipe } from './text-overflow.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [currencyShortPipe, TimePipe, TextOverflowPipe, sumTotalPipe],
  imports: [CommonModule],
  exports: [currencyShortPipe, sumTotalPipe, TextOverflowPipe, TimePipe],
  providers: [currencyShortPipe, sumTotalPipe, TextOverflowPipe, TimePipe],
})
export class CiPipeModule {}
