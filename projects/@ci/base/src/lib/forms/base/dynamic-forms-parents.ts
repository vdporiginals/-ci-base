import { Directive, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormsModel } from '../models/base-forms.model';
import { CiFormsControlService } from '../services/ci-dynamic-forms.service';

@Directive()
export abstract class CiDynamicFormsParentComponent implements OnInit {
  @Input() formProps: BaseFormsModel<string>[] = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private ciFormsService: CiFormsControlService) {}

  ngOnInit() {
    this.form = this.ciFormsService.toFormGroup(this.formProps);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
