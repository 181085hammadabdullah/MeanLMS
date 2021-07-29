import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeServicesComponent } from './trainee-services.component';

describe('TraineeServicesComponent', () => {
  let component: TraineeServicesComponent;
  let fixture: ComponentFixture<TraineeServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
