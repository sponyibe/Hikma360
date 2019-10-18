import { TestBed } from '@angular/core/testing';

import { CertifyingBodiesService } from './certifyingbodies.service';

describe('CertifyingBodiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertifyingBodiesService = TestBed.get(CertifyingBodiesService);
    expect(service).toBeTruthy();
  });
});