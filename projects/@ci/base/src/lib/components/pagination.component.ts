import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationAbtractsComponent } from '../abtracts/pagination-component';

@Component({
  selector: 'ci-pagination',
  styles: [``],
  template: `
    <pagination-template
      class="fruit_pagination"
      #pg="paginationApi"
      (pageChange)="pageChanged($event)"
      [id]="id"
    >
      <ul class="pagination_list" fxLayout="row" fxLayoutAlign="center center">
        <div>
          <li class="page_item page_item_previous">
            <a class="page_link" aria-label="Previous" (click)="pg.previous()">
              Trước
            </a>
          </li>
        </div>
        <div
          *ngFor="let page of pg.pages"
          [class.active]="pg.getCurrent() === page.value"
        >
          <li class="page_item">
            <a
              class="page_link"
              (click)="pg.setCurrent(page.value)"
              [class.disabled]="pg.getCurrent() === page.value"
              *ngIf="pg.getCurrent() !== page.value"
              >{{ page.label }}</a
            >
            <a class="page_link" *ngIf="pg.getCurrent() === page.value">{{
              page.label
            }}</a>
          </li>
        </div>
        <div>
          <li class="page_item page_item_next">
            <a
              class="page_link"
              aria-label="Next"
              (click)="pg.next()"
              *ngIf="pg.getCurrent() !== pg.getLastPage()"
            >
              Sau
            </a>
            <a
              class="page_link"
              aria-label="Next"
              *ngIf="pg.getCurrent() === pg.getLastPage()"
            >
              Sau
            </a>
          </li>
        </div>
      </ul>
    </pagination-template>
  `,
})
export class PaginationComponent extends PaginationAbtractsComponent {
  @Input() id!: string;
  @Input() maxSize!: number;
  @Output() pageChange!: EventEmitter<number>;
  @Output() pageBoundsCorrection!: EventEmitter<number>;
}
