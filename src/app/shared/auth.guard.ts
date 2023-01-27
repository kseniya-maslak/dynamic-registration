import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.userService.user$.pipe(
      map(user => user != null),
      tap(isUser => {
        if (!isUser) {
          this.toast.error('No user provided');
        }
      }),
      map(isUser => {
        return isUser ? true : this.router.parseUrl('');
      })
    );
  }
}
