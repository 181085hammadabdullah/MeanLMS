import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredStudentsCoursesComponent } from './registered-students-courses.component';

describe('RegisteredStudentsCoursesComponent', () => {
  let component: RegisteredStudentsCoursesComponent;
  let fixture: ComponentFixture<RegisteredStudentsCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredStudentsCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredStudentsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
