import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [SearchInputComponent],
})
export class CiBaseModule {}
