import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationAbtractsComponent } from '../abtracts/pagination-component';

@Component({
  selector: 'ci-pagination',
  styles: [
    `
      .pagination_list {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  template: `
    <pagination-template
      [class]="cssClass"
      #pg="paginationApi"
      (pageChange)="pageChange.emit($event)"
      [id]="id"
    >
      <ul class="pagination_list">
        <div>
          <li class="page_item page_item_previous">
            <a class="page_link" aria-label="Previous" (click)="pg.previous()">
              Trước
            </a>
          </li>
        </div>
        <div
          *ngFor="let page of pg.pages"
          [class.active_page]="pg.getCurrent() == page.value"
        >
          <li class="page_item">
            <a
              class="page_link"
              (click)="pg.setCurrent(page.value)"
              [class.disabled_page]="pg.getCurrent() == page.value"
              *ngIf="pg.getCurrent() !== page.value"
              >{{ page.label }}</a
            >
            <a class="page_link" *ngIf="pg.getCurrent() == page.value">{{
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends PaginationAbtractsComponent {}

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [PaginationComponent],
})
export class PaginationComponentModule {}
