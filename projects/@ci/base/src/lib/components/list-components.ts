import { Injectable, Input } from '@angular/core';

@Injectable()
export abstract class ListComponent<T> {
  @Input() items: T[] | undefined;
}
