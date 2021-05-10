import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumTotal',
})
export class SumTotalPipe implements PipeTransform {
  constructor() {}
  transform(list: any[], args?: any): any {
    // console.log(list);
    if (Number(+list[0])) {
      return list.reduce((a, b) => a + b);
    }

    const total = list
      .map((a) => {
        if (a.TotalPayValue) {
          return a.TotalPayValue;
        } else if (a.Value) {
          return a.Value;
        } else {
          return a[args];
        }
      })
      .reduce((a, b) => a + b);

    return total;
  }
}

@NgModule({
  declarations: [SumTotalPipe],
  exports: [SumTotalPipe],
})
export class SumTotalPipeModule {}
