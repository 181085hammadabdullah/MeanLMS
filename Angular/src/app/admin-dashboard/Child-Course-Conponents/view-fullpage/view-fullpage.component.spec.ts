import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullpageComponent } from './view-fullpage.component';

describe('ViewFullpageComponent', () => {
  let component: ViewFullpageComponent;
  let fixture: ComponentFixture<ViewFullpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFullpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
