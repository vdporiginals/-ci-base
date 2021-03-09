import { BaseValidatorsModel } from './base-forms-validators.model';

export class BaseFormsModel<T> {
  value: T | undefined;
  key: string;
  label: string;
  validators: BaseValidatorsModel | undefined;
  order: number;
  controlType: string;
  type: string; // Input Type
  options: { key: string; value: string }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      validators?: BaseValidatorsModel;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.validators = options.validators;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
