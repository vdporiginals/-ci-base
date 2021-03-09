import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { currencyShortPipe } from '@ci/base';
import { QuestionBase } from '../base/question-base';

@Component({
  selector: 'app-dynamic-forms-question',
  templateUrl: './dynamic-forms-question.component.html',
  styleUrls: ['./dynamic-forms-question.component.scss'],
})
export class DynamicFormsQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  constructor(currencyShortPipe: currencyShortPipe){}
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
