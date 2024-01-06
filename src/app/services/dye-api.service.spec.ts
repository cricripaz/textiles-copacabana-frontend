import { TestBed } from '@angular/core/testing';

import { DyeApiService } from './dye-api.service';

describe('DyeApiService', () => {
  let service: DyeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DyeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
