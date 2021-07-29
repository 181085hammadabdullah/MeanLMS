import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentVideosComponent } from './upload-content-videos.component';

describe('UploadContentVideosComponent', () => {
  let component: UploadContentVideosComponent;
  let fixture: ComponentFixture<UploadContentVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadContentVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContentVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
