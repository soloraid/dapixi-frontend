import { TestBed } from '@angular/core/testing';

import { ThirdPartyOAuthSSOService } from './third-party-oauth-sso.service';

describe('ThirdPartyOAuthSSOService', () => {
  let service: ThirdPartyOAuthSSOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartyOAuthSSOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
