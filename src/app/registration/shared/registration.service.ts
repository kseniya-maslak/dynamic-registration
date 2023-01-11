import { Injectable } from '@angular/core';
import { RegistrationField } from '../model/registration-field.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RegistrationRequest } from '../model/registration-request.model';
import { validateSync } from 'class-validator';
import { RegistrationForm } from '../model/registration-form.model';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  requestRegistrationFields(): Observable<RegistrationField[]> {
    return this.http
      .get<RegistrationField[]>(environment.registrationFieldApi)
      .pipe(
        map(fields => {
          const form = new RegistrationForm(fields);
          const error = validateSync(form);
          if (error.length !== 0) {
            throw new Error('Form validation error');
          }
          return form.form;
        })
      );
  }

  submitRegistration(
    registrationRequest: RegistrationRequest
  ): Observable<void> {
    return this.http.post<void>(
      environment.registrationApi,
      registrationRequest
    );
  }
}
