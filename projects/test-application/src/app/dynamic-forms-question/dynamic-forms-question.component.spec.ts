import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsQuestionComponent } from './dynamic-forms-question.component';

describe('DynamicFormsQuestionComponent', () => {
  let component: DynamicFormsQuestionComponent;
  let fixture: ComponentFixture<DynamicFormsQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormsQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
