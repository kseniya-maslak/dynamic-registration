import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';

let user$: BehaviorSubject<User | null>;

@Injectable()
class MockUserService {
  user$ = user$;
}

@Injectable()
class MockToastrService {
  error() {}
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let toastrService: ToastrService;

  beforeEach(() => {
    user$ = new BehaviorSubject<User | null>(null);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useClass: MockUserService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should show error and redirect if no user on canLoad', (done: DoneFn) => {
    spyOn(toastrService, 'error');
    const canLoad = guard.canLoad({}, []);
    canLoad.subscribe(result => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(result).not.toBe(true);
      done();
    });
  });

  it('should user on canLoad', (done: DoneFn) => {
    spyOn(toastrService, 'error');
    user$.next({});
    const canLoad = guard.canLoad({}, []);
    canLoad.subscribe(result => {
      expect(toastrService.error).not.toHaveBeenCalled();
      expect(result).toBe(true);
      done();
    });
  });
});
