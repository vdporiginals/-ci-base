import { Injectable, Input } from '@angular/core';

@Injectable()<ng-content><
export abstract class ListComponent<T> {
  @Input() items: T[] | undefined;
}
