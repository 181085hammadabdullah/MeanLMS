import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentPicturesComponent } from './upload-content-pictures.component';

describe('UploadContentPicturesComponent', () => {
  let component: UploadContentPicturesComponent;
  let fixture: ComponentFixture<UploadContentPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadContentPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContentPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
