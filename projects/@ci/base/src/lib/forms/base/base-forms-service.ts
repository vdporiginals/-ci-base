import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BaseFormsModel } from '../models/base-forms.model';

export abstract class CiBaseFormsService {
  toFormGroup(formProps: BaseFormsModel<string>[]) {
    const group: any = {};

    formProps.forEach((formProp) => {
      if (formProp.validators) {
        if (formProp.validators.min) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.min(formProp.validators.min)
          );
        } else if (formProp.validators.max) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.max(formProp.validators.max)
          );
        } else if (formProp.validators.required) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.required
          );
        } else if (formProp.validators.email) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.email
          );
        } else if (formProp.validators.minLength) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.minLength(formProp.validators.minLength)
          );
        } else if (formProp.validators.maxLength) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.maxLength(formProp.validators.maxLength)
          );
        } else if (formProp.validators.pattern) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.pattern(formProp.validators.pattern)
          );
        } else if (formProp.validators.composeValidators) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.compose(formProp.validators.composeValidators)
          );
        } else if (formProp.validators.composeAsyncValidators) {
          group[formProp.key] = new FormControl(
            formProp.value || '',
            Validators.composeAsync(formProp.validators.composeAsyncValidators)
          );
        } else {
          group[formProp.key] = new FormControl(formProp.value || '');
        }
      }
    });

    return new FormGroup(group);
  }
}
