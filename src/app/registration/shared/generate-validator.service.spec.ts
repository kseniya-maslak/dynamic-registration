import { TestBed } from '@angular/core/testing';

import { GenerateValidatorService } from './generate-validator.service';
import { RegistrationField } from '../model/registration-field.model';
import { FormControl, ValidatorFn } from '@angular/forms';
import { SupportedFieldTypesEnum } from '../model/supported-field-types.enum';
import { SupportedValidatorsEnum } from '../model/supported-validators.enum';

const mock: RegistrationField = {
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
};

describe('GenerateValidatorService', () => {
  let service: GenerateValidatorService;
  let validator: ValidatorFn;
  let control: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GenerateValidatorService] });
    service = TestBed.inject(GenerateValidatorService);
    validator = service.generateValidatorFunction(mock);
    control = new FormControl('', validator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validator should return error by min', () => {
    control.setValue('1');
    expect(control.hasError('error')).toBeTruthy();
    expect(control.getError('error')).toBe(
      'Must not be less than 4 characters.'
    );
  });

  it('validator should return error by max', () => {
    control.setValue('12345678901');
    expect(control.hasError('error')).toBeTruthy();
    expect(control.getError('error')).toBe('Must be less than 47 characters.');
  });

  it('validator should return error by regex', () => {
    control.setValue('abcde');
    expect(control.hasError('error')).toBeTruthy();
    expect(control.getError('error')).toBe('Only numbers are allowed.');
  });

  it('validator should return first error if conflict', () => {
    control.setValue('a');
    expect(control.hasError('error')).toBeTruthy();
    expect(control.getError('error')).toBe('Only numbers are allowed.');
  });

  it('validator should return error if empty', () => {
    control.setValue('');
    expect(control.hasError('error')).toBeTruthy();
    expect(control.getError('error')).toBe('Mobile number is required');
  });

  it('validator should return no error if valid', () => {
    control.setValue('12345');
    expect(control.hasError('error')).toBeFalse();
  });
});
