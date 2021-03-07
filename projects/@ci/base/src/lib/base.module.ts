import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListComponent } from './components/list.component';
import { PaginationComponent } from './components/pagination.component';
import { SearchInputComponent } from './components/search-input';

@NgModule({
  declarations: [SearchInputComponent, ListComponent, PaginationComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [
    SearchInputComponent,
    ListComponent,
    NgxPaginationModule,
    PaginationComponent,
  ],
})
export class CiBaseModule {}
