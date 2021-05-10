import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  //Time Countdown minute
  transform(value: number, args?: any): any {
    return `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)}`;
  }
}
@NgModule({
  declarations: [TimePipe],
  exports: [TimePipe],
})
export class TimePipeModule {}
