import { TestBed } from '@angular/core/testing';

import { CertifyingOrganizationService } from './certifyingorganization.service';

describe('CertifyingOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertifyingOrganizationService = TestBed.get(CertifyingOrganizationService);
    expect(service).toBeTruthy();
  });
});