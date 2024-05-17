import { TestBed } from '@angular/core/testing';

import { MaterialApiService } from './material-api.service';

describe('MaterialApiService', () => {
  let service: MaterialApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
