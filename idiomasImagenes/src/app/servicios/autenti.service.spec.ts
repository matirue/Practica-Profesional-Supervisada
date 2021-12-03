import { TestBed } from '@angular/core/testing';

import { AutentiService } from './autenti.service';

describe('AutentiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutentiService = TestBed.get(AutentiService);
    expect(service).toBeTruthy();
  });
});
