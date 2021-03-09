import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyShort',
})
export class currencyShortPipe implements PipeTransform {
  transform(input: any, args?: any): string | null {
    let exp,
      rounded,
      suffixes = ['k', 'M', 'Tỷ', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    if (suffixes[exp - 1] === 'Tỷ' || input / Math.pow(1000, exp) < 101) {
      args = 1;
    }

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
