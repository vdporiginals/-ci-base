import { Directive, Input } from '@angular/core';
@Directive()
export abstract class DetailAbtractsComponent<T> {
  @Input() item!: T;
}
