import { TestBed } from '@angular/core/testing';

import { GenerateFormService } from './generate-form.service';
import { RegistrationField } from './registration-field.model';
import { Injectable } from '@angular/core';
import { GenerateValidatorService } from './generate-validator.service';
import { ValidatorFn } from '@angular/forms';

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

@Injectable()
class MockGenerateValidatorService {
  generateValidatorFunction(): ValidatorFn {
    return () => null;
  }
}

describe('GenerateFormService', () => {
  let service: GenerateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GenerateFormService,
        {
          provide: GenerateValidatorService,
          useClass: MockGenerateValidatorService,
        },
      ],
    });
    service = TestBed.inject(GenerateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate form group', () => {
    const form = service.generateForm(mock);
    expect(form.controls.hasOwnProperty('phone_number')).toBeTruthy();
  });
});
