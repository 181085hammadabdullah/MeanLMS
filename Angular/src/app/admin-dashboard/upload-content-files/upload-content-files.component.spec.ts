import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentFilesComponent } from './upload-content-files.component';

describe('UploadContentFilesComponent', () => {
  let component: UploadContentFilesComponent;
  let fixture: ComponentFixture<UploadContentFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadContentFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
