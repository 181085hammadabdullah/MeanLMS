import { TestBed } from '@angular/core/testing';

import { AdminchatService } from './adminchat.service';

describe('AdminchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminchatService = TestBed.get(AdminchatService);
    expect(service).toBeTruthy();
  });
});
