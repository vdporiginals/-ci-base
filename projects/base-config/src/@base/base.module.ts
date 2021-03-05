// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCreateComponent } from './form-create/form-create.component';
import { FormListComponent } from './form-list/form-list.component';
@NgModule({
    declarations: [
        FormCreateComponent,
        FormListComponent
    ],
    exports: [
        FormCreateComponent,
        FormListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    providers: []
})
export class BasesModule {
}
