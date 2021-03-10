import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CiBaseFormsModel,
  CiSelectInput,
  CiTextboxInput,
} from 'projects/@ci/base/src/public-api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-application';
  textSearch: FormControl = new FormControl();
  questions$!: Observable<CiBaseFormsModel<any>[]>;
  ngOnInit() {
    this.questions$ = this.setUpForms();
  }

  setUpForms(): Observable<CiBaseFormsModel<any>[]> {
    const questions: CiBaseFormsModel<any>[] = [
      new CiSelectInput({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new CiTextboxInput({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        validators: {
          required: true,
        },
        order: 1,
      }),

      new CiTextboxInput({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
  searchItemsServer(ev: any) {
    console.log(ev);
  }
  searchItemsClient(ev: any) {
    console.log(ev);
  }
}
