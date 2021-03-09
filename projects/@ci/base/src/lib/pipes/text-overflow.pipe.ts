import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textOverflow',
})
export class TextOverflowPipe implements PipeTransform {
  transform(value: any, args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 25;
    const trail = args.length > 1 ? args[1] : '...Xem Thêm';
    return value?.length > limit ? value?.substring(0, limit) + trail : value;
  }
}
