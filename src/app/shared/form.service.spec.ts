import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Field } from '../model/field.model';
import { Observable, of } from 'rxjs';
import { SupportedFieldTypesEnum } from '../model/supported-field-types.enum';
import { SupportedValidatorsEnum } from '../model/supported-validators.enum';
import { Form } from '../model/form.model';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';

const mock: Field[] = [
  {
    type: SupportedFieldTypesEnum.PHONE,
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: SupportedValidatorsEnum.REGEX,
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$',
      },
      {
        name: SupportedValidatorsEnum.MAXLENGTH,
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        name: SupportedValidatorsEnum.MINLENGTH,
        message: 'Must not be less than 4 characters.',
        value: 4,
      },
    ],
  },
];

const mockInvalid: Field[] = [
  {
    type: SupportedFieldTypesEnum.PHONE,
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: SupportedValidatorsEnum.REGEX,
        message: 'Only numbers are allowed.',
        value: 10,
      },
      {
        name: SupportedValidatorsEnum.MAXLENGTH,
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        // @ts-ignore
        name: 'some_name',
        message: 'Must not be less than 4 characters.',
        value: 4,
      },
    ],
  },
];

@Injectable()
class MockUserService {
  registerUser(user: User): Observable<User> {
    return of(user);
  }
  resetUser() {}
}

describe('FormService', () => {
  let service: FormService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FormService,
        { provide: UserService, useClass: MockUserService },
      ],
    });
    service = TestBed.inject(FormService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on requestRegistrationFields should return checked results', (done: DoneFn) => {
    spyOn(http, 'get').and.returnValue(of(mock));
    const response$ = service.requestRegistrationForm();
    expect(http.get).toHaveBeenCalledWith(environment.registrationFieldApi);
    response$.subscribe(field => {
      expect(field).toEqual(new Form(mock));
      done();
    });
  });

  it('on requestRegistrationFields should fail on invalid results', (done: DoneFn) => {
    spyOn(http, 'get').and.returnValue(of(mockInvalid));
    const response$ = service.requestRegistrationForm();
    expect(http.get).toHaveBeenCalledWith(environment.registrationFieldApi);
    response$.subscribe({
      next: () => done.fail('Error expected with invalid response'),
      error: error => {
        expect(error).toEqual(new Error('Form validation error'));
        done();
      },
    });
  });
});
