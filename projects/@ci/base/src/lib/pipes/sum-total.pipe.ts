import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumTotal',
})
export class sumTotalPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}
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
