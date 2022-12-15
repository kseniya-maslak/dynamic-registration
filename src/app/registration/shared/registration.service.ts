import { Injectable } from '@angular/core';
import { RegistrationField } from './registration-field.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest } from './registration-request.model';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  requestRegistrationFields(): Observable<RegistrationField[]> {
    return this.http.get<RegistrationField[]>(environment.registrationFieldApi);
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
