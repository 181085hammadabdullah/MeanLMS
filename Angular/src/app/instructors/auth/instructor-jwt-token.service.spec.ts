import { TestBed } from '@angular/core/testing';

import { InstructorJwtTokenService } from './instructor-jwt-token.service';

describe('InstructorJwtTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorJwtTokenService = TestBed.get(InstructorJwtTokenService);
    expect(service).toBeTruthy();
  });
});
