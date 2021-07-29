import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersProfilesComponent } from './developers-profiles.component';

describe('DevelopersProfilesComponent', () => {
  let component: DevelopersProfilesComponent;
  let fixture: ComponentFixture<DevelopersProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
