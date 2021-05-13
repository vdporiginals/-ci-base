import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'checkDatePipe' })
export class CheckDatePipe implements PipeTransform {
  transform(value: any, args: any) {
    if (value && args) {
      let currentDate = new Date(value.CreatedOn).getDate();
      let beforeDate = new Date(args.CreatedOn).getDate();
      return currentDate > beforeDate;
    }
    return false;
  }
}
@NgModule({
  declarations: [CheckDatePipe],
  imports: [CommonModule],
  exports: [CheckDatePipe],
})
export class CheckDatePipeModule {}
