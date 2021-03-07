import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
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
                currentPage: currentPage,
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
})
export class ListComponent extends ListAbtractsComponent<any> {
  @Input() id!: string;
  @Input() itemsPerPage = 2;
  @Input() currentPage: number = 0;
  @Input() totalItem!: number;

  @ContentChild('item', { static: false }) listTemplate!: TemplateRef<any>;
  @ContentChild('pagination', { static: false }) pagination!: TemplateRef<any>;

  // get start() {
  //   return this.currentPage * this.itemsPerPage;
  // }

  // get end() {
  //   return this.currentPage * this.itemsPerPage + this.itemsPerPage;
  // }
}
