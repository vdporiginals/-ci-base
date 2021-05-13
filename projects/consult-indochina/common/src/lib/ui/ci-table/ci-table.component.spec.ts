import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiTableComponent } from './ci-table.component';

describe('CiTableComponent', () => {
  let component: CiTableComponent;
  let fixture: ComponentFixture<CiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
