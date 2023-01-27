import { Injectable } from '@angular/core';
import { Field } from '../model/field.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { validateSync } from 'class-validator';
import { Form } from '../model/form.model';

@Injectable()
export class FormService {
  private _form$: BehaviorSubject<Form | null> =
    new BehaviorSubject<Form | null>(null);
  readonly form$: Observable<Form | null> = this._form$.asObservable();

  constructor(private http: HttpClient) {}

  requestRegistrationForm(): Observable<Form> {
    return this.http.get<Field[]>(environment.registrationFieldApi).pipe(
      map(fields => this.validateForm(fields)),
      tap(form => this._form$.next(form))
    );
  }

  getForm(): Form | null {
    return this._form$.getValue();
  }

  private validateForm(fields: Field[]): Form {
    const form = new Form(fields);
    const error = validateSync(form);
    if (error.length !== 0) {
      throw new Error('Form validation error');
    }
    return form;
  }
}
