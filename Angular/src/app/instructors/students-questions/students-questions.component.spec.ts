import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsQuestionsComponent } from './students-questions.component';

describe('StudentsQuestionsComponent', () => {
  let component: StudentsQuestionsComponent;
  let fixture: ComponentFixture<StudentsQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
