import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImplinksComponent } from './view-implinks.component';

describe('ViewImplinksComponent', () => {
  let component: ViewImplinksComponent;
  let fixture: ComponentFixture<ViewImplinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImplinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImplinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
