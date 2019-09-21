import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFeedbackComponent } from './invalid-feedback.component';

describe('InvalidFeedbackComponent', () => {
  let component: InvalidFeedbackComponent;
  let fixture: ComponentFixture<InvalidFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
