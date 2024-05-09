import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user-api.service';
import {HttpTestingController} from "@angular/common/http/testing";

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users from the API', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNyaWNyaXBheiIsInJvbGVfaWQiOjEsInVzZXJfaWQiOjIzNDN9.a236i4p6gHIp6D-gmxv13CcLH77aJddZh2H70E2pXUg';
    const expected = {
      message: 'Users get successfully',
      users: [
        {
          "user_id": 2343,
          "username": "cricripaz",
          "role": "admin",
          "email": "cricripaz6@gmail.com",
          "name": "test angular",
          "lastName": "paz conde",
          "state": "active",
          "ci": "232222222",
          "numberPhone": "72010260"
        },
        // ... other users
      ]
    };


    service.fetchUsers().subscribe(response => {
      expect(response).toEqual(expected);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(expected.users);
  });

});
