import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on submitRegistration should send request', () => {
    spyOn(http, 'post').and.returnValue(of({}));
    service.registerUser({});
    expect(http.post).toHaveBeenCalledWith(environment.registrationApi, {});
  });
});
