import { QuestionBase } from './question-base';

export class SelectQuestion extends QuestionBase<string> {
  controlType = 'select';
}
