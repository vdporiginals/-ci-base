import { HttpClient } from '@angular/common/http';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
interface ApiDetail {
  apiUrl: string;
  params: Record<string, string>;
}
@Directive()
export abstract class ListAbtractsComponent<T> {
  @Input() items!: T[];
  @Input() page: number = 1;
  @Input() itemPerPage: number = 5;
  @Input() totalItem!: number;
  @Input() apiDetail!: ApiDetail;

  @Output() changePage = new EventEmitter()
  constructor(private http: HttpClient) {}

  nextPage() {
    this.changePage.emit(this.page + 1);
  }
}
