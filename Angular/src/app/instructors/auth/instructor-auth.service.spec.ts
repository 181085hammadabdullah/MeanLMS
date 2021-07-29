import { TestBed } from '@angular/core/testing';

import { InstructorAuthService } from './instructor-auth.service';

describe('InstructorAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorAuthService = TestBed.get(InstructorAuthService);
    expect(service).toBeTruthy();
  });
});
