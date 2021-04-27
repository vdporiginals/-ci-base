import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  NgModule,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListAbtractsComponent } from '../abtracts';

@Component({
  selector: 'ci-list',
  template: `
    <div
      *ngFor="
        let item of items
          | paginate
            : {
                itemsPerPage: itemPerPage,
                currentPage: pageCur,
                totalItems: totalItem,
                id: id
              }
      "
    >
      <ng-container
        *ngTemplateOutlet="listTemplate; context: { item: item }"
      ></ng-container>
    </div>
    <div>
      <ng-container
        *ngTemplateOutlet="pagination; context: { item: pagination }"
      ></ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiListComponent
  extends ListAbtractsComponent<any>
  implements OnChanges {
  pageCur = 0;
  @ContentChild('item', { static: false }) listTemplate!: TemplateRef<any>;
  @ContentChild('pagination', { static: false }) pagination!: TemplateRef<any>;

  // get start() {
  //   return this.currentPage * this.itemsPerPage;
  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.pageCur = changes.currentPage.currentValue;
  }
  // get end() {
  //   return this.currentPage * this.itemsPerPage + this.itemsPerPage;
  // }
}

@NgModule({
  declarations: [CiListComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [CiListComponent],
})
export class CiListComponentModule {}
