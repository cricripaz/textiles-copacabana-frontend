import { TestBed } from '@angular/core/testing';

import { TintesApiService } from './tintes-api.service';

describe('TintesApiService', () => {
  let service: TintesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TintesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
