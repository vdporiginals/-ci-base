import { Directive, EventEmitter, Input, Output } from '@angular/core';
@Directive()
export abstract class ListAbtractsComponent<T> {
  @Input() id!: string;
  @Input() items!: T[];
  @Input() itemPerPage: number = 5;
  @Input() totalItem!: number;
  @Input() currentPage: number = 0;
}
