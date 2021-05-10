import { InjectionToken, Injector, ValueProvider } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormControlModel } from '../model/dynamic-form-control.model';
import { DynamicFormValidationService } from './dynamic-form-validation.service';
import { isObject } from '../utils/core.utils';
import { DynamicValidatorsConfig } from '../model/misc/dynamic-form-control-validation.model';
import { DynamicFormService } from './dynamic-form.service';

export const MATCH_DISABLED = 'DISABLED';
export const MATCH_ENABLED = 'ENABLED';
export const MATCH_HIDDEN = 'HIDDEN';
export const MATCH_OPTIONAL = 'OPTIONAL';
export const MATCH_REQUIRED = 'REQUIRED';
export const MATCH_VISIBLE = 'VISIBLE';

export const AND_OPERATOR = 'AND';
export const OR_OPERATOR = 'OR';

export interface DynamicFormControlMatcher {
  match: string;
  opposingMatch: string | null;

  onChange(
    hasMatch: boolean,
    model: DynamicFormControlModel,
    control: FormControl,
    injector: Injector
  ): void;
}

export const DYNAMIC_MATCHERS = new InjectionToken<DynamicFormControlMatcher>(
  'DYNAMIC_MATCHERS'
);

export const DISABLED_MATCHER: DynamicFormControlMatcher = {
  match: MATCH_DISABLED,
  opposingMatch: MATCH_ENABLED,
  onChange(hasMatch, model) {
    model.disabled = hasMatch;
  },
};

export const HIDDEN_MATCHER: DynamicFormControlMatcher = {
  match: MATCH_HIDDEN,
  opposingMatch: MATCH_VISIBLE,
  onChange(hasMatch, model) {
    model.hidden = hasMatch;
  },
};

export const REQUIRED_MATCHER: DynamicFormControlMatcher = {
  match: MATCH_REQUIRED,
  opposingMatch: MATCH_OPTIONAL,
  onChange(hasMatch, model, control, injector) {
    let validatorsConfig = null;

    if (hasMatch) {
      validatorsConfig = isObject(model.validators)
        ? { ...model.validators, required: null }
        : { required: null };
    } else {
      if (isObject(model.validators)) {
        delete (model.validators as Pick<DynamicValidatorsConfig, 'required'>)
          .required;
        validatorsConfig = { ...model.validators };
      }
    }

    injector
      .get(DynamicFormValidationService)
      .updateValidators(validatorsConfig, control, model);
    injector.get(DynamicFormService).detectChanges();
  },
};

export const DISABLED_MATCHER_PROVIDER: ValueProvider = {
  provide: DYNAMIC_MATCHERS,
  useValue: DISABLED_MATCHER,
  multi: true,
};

export const HIDDEN_MATCHER_PROVIDER: ValueProvider = {
  provide: DYNAMIC_MATCHERS,
  useValue: HIDDEN_MATCHER,
  multi: true,
};

export const REQUIRED_MATCHER_PROVIDER: ValueProvider = {
  provide: DYNAMIC_MATCHERS,
  useValue: REQUIRED_MATCHER,
  multi: true,
};

export const DYNAMIC_MATCHER_PROVIDERS = [
  DISABLED_MATCHER_PROVIDER,
  HIDDEN_MATCHER_PROVIDER,
  REQUIRED_MATCHER_PROVIDER,
];
