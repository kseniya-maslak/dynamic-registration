import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { registrationFieldsResponse } from '../../../mock/registration-fields-response.mock';
import { environment } from '../../../environments/environment';
import { RegistrationField } from './registration-field.model';

@Injectable()
export class MockRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let response: HttpResponse<unknown>;
    if (
      request.method === 'GET' &&
      request.url === environment.registrationFieldApi
    ) {
      response = this.mockGetRegistrationFieldsResponse();
    } else if (
      request.method === 'POST' &&
      request.url === environment.registrationApi
    ) {
      response = this.mockPostRegistrationResponse();
    } else {
      return next.handle(request);
    }
    return of(response).pipe(delay(5000));
  }

  private mockGetRegistrationFieldsResponse(): HttpResponse<
    RegistrationField[]
  > {
    return new HttpResponse({
      status: 200,
      body: registrationFieldsResponse,
    });
  }

  private mockPostRegistrationResponse(): HttpResponse<null> {
    return new HttpResponse({
      status: 200,
    });
  }
}
