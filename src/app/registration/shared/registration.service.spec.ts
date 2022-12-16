import { fakeAsync, TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegistrationField } from './registration-field.model';
import { of } from 'rxjs';

const mock: RegistrationField[] = [
  {
    type: 'phone',
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: 'regex',
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$',
      },
      {
        name: 'maxlength',
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        name: 'minlength',
        message: 'Must not be less than 4 characters.',
        value: 4,
      },
    ],
  },
];

const mockInvalid: RegistrationField[] = [
  {
    type: 'phone',
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: 'regex',
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$',
      },
      {
        name: 'maxlength',
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        name: 'some_name',
        message: 'Must not be less than 4 characters.',
        value: 4,
      },
    ],
  },
];
describe('RegistrationService', () => {
  let service: RegistrationService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService],
    });
    service = TestBed.inject(RegistrationService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on submitRegistration should send request', () => {
    spyOn(http, 'post');
    service.submitRegistration({});
    expect(http.post).toHaveBeenCalledWith(environment.registrationApi, {});
  });

  it('on requestRegistrationFields should return checked results', fakeAsync(() => {
    spyOn(http, 'get').and.returnValue(of(mock));
    const response$ = service.requestRegistrationFields();
    expect(http.get).toHaveBeenCalledWith(environment.registrationFieldApi);
    response$.subscribe(field => {
      expect(field).toEqual(mock);
    });
  }));

  it('on requestRegistrationFields should return checked results', fakeAsync(() => {
    spyOn(http, 'get').and.returnValue(of(mockInvalid));
    const response$ = service.requestRegistrationFields();
    expect(http.get).toHaveBeenCalledWith(environment.registrationFieldApi);
    response$.subscribe({
      error: error => {
        expect(error).toEqual(new Error('Form validation error'));
      },
    });
  }));
});
