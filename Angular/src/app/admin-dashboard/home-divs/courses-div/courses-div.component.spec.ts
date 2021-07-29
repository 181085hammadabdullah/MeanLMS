import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDivComponent } from './courses-div.component';

describe('CoursesDivComponent', () => {
  let component: CoursesDivComponent;
  let fixture: ComponentFixture<CoursesDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
