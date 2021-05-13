import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { BaseCiTable } from '../../../base/base-ci-table';
import { DataTable, ListLabel } from './ci-table.model';
import { TypeEventTable } from '../../../base/base-ci-table'
@Component({
  selector: 'ci-table',
  templateUrl: './ci-table.component.html',
  styleUrls: ['./ci-table.component.scss']
})

export class CiTableComponent extends BaseCiTable<DataTable, ListLabel> implements OnInit {
  typeEventTable = TypeEventTable

  ngOnInit(): void {
  }


}

@NgModule({
  declarations: [CiTableComponent],
  imports: [
    CommonModule,
  ],
  exports: [CiTableComponent]
})
export class CiTableModule {

}