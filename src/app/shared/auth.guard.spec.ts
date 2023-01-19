import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
class MockUserService {
  registerUser(user: User): Observable<User> {
    return of(user);
  }
}
@Injectable()
class MockToastrService {
  error() {}
}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
