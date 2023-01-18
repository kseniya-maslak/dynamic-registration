import { Injectable } from '@angular/core';
import { Field } from '../model/field.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { validateSync } from 'class-validator';
import { Form } from '../model/form.model';
import { UserService } from './user.service';

@Injectable()
export class FormService {
  private _form$: BehaviorSubject<Form | null> =
    new BehaviorSubject<Form | null>(null);
  readonly form$: Observable<Form | null> = this._form$.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  requestRegistrationForm(): Observable<Form> {
    return this.http.get<Field[]>(environment.registrationFieldApi).pipe(
      map(fields => this.validateForm(fields)),
      tap(form => this.setForm(form))
    );
  }

  private validateForm(fields: Field[]): Form {
    const form = new Form(fields);
    const error = validateSync(form);
    if (error.length !== 0) {
      throw new Error('Form validation error');
    }
    return form;
  }

  private setForm(form: Form) {
    this._form$.next(form);
    this.userService.resetUser();
  }
}
