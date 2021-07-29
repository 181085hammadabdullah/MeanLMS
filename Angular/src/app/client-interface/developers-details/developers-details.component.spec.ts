import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersDetailsComponent } from './developers-details.component';

describe('DevelopersDetailsComponent', () => {
  let component: DevelopersDetailsComponent;
  let fixture: ComponentFixture<DevelopersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
