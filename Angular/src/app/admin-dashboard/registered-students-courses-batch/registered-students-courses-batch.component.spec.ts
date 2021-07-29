import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredStudentsCoursesBatchComponent } from './registered-students-courses-batch.component';

describe('RegisteredStudentsCoursesBatchComponent', () => {
  let component: RegisteredStudentsCoursesBatchComponent;
  let fixture: ComponentFixture<RegisteredStudentsCoursesBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredStudentsCoursesBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredStudentsCoursesBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
