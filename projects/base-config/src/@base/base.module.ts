// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormListComponent } from './form-list/form-list.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [FormCreateComponent, FormListComponent],
  exports: [FormCreateComponent, FormListComponent],
  imports: [BrowserModule, CommonModule, RouterModule, FormsModule],
  providers: [],
})
export class BasesModule {}
