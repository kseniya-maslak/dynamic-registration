import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class MockRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.method === 'GET' &&
      request.url === environment.registrationFieldApi
    ) {
      request = request.clone({
        url: 'assets/mock/registration-fields-response.mock.json',
      });
    } else if (
      request.method === 'POST' &&
      request.url === environment.registrationApi
    ) {
      return of(this.mockPostRegistrationResponse(request)).pipe(delay(1000));
    }
    return next.handle(request);
  }

  private mockPostRegistrationResponse(
    request: HttpRequest<unknown>
  ): HttpResponse<unknown> {
    return new HttpResponse({
      status: 200,
      body: request.body,
    });
  }
}
