import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface BaseValidatorsModel {
  min?: number;
  max?: number;
  required?: boolean;
  email?: boolean | null;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  composeValidators?: ValidatorFn[];
  composeAsyncValidators?: AsyncValidatorFn[];
}
