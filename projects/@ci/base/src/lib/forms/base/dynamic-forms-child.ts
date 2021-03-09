import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormsModel } from '../models/base-forms.model';

@Directive()
export abstract class CiDynamicFormsChildComponent {
  @Input() formProps!: BaseFormsModel<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.formProps.key].valid;
  }
}
