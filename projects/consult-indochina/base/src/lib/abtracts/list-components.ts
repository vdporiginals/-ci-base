import { Directive, Input } from '@angular/core';
@Directive()
export abstract class ListAbtractsComponent<T> {
  @Input() id!: string;
  @Input() items!: T[];
  @Input() itemPerPage: number = 5;
  @Input() totalItem!: number;
  @Input() currentPage: number = 0;
}
