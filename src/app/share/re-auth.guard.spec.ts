import { TestBed } from '@angular/core/testing';

import { ReAuthGuard } from './re-auth.guard';

describe('ReAuthGuard', () => {
  let guard: ReAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
