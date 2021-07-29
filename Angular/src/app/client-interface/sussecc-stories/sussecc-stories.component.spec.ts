import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SusseccStoriesComponent } from './sussecc-stories.component';

describe('SusseccStoriesComponent', () => {
  let component: SusseccStoriesComponent;
  let fixture: ComponentFixture<SusseccStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SusseccStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SusseccStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
