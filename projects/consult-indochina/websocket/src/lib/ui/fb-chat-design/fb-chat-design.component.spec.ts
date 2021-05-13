import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbChatDesignComponent } from './fb-chat-design.component';

describe('FbChatDesignComponent', () => {
  let component: FbChatDesignComponent;
  let fixture: ComponentFixture<FbChatDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbChatDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbChatDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
