import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private _user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this._user$.asObservable();
  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(environment.registrationApi, user)
      .pipe(tap(user => this._user$.next(user)));
  }
}
