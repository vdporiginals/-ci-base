import { HttpClient } from '@angular/common/http';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
interface ApiDetail {
  apiUrl: string;
  params: Record<string, string>;
}
@Directive()
export abstract class PaginationAbtractsComponent {
  @Input() page: number = 1;
  @Input() itemPerPage: number = 5;
  @Input() totalItem!: number;

  @Output() changePage = new EventEmitter();
  constructor() {}

  pageChanged(ev?: unknown) {
    console.log(ev);
    
    if (ev) {
      this.changePage.emit(ev);
    } else {
      this.changePage.emit(this.page);
    }
  }
}
