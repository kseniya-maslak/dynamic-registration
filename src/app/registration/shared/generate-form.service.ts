import { Injectable } from '@angular/core';
import { RegistrationField } from './registration-field.model';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FieldValidation } from './field-validation.model';
import { SupportedValidatorsEnum } from './supported-validators.enum';

@Injectable()
export class GenerateFormService {
  constructor() {}

  generateForm(registrationFields: RegistrationField[]) {
    let form: { [key: string]: FormControl } = {};
    for (let field of registrationFields) {
      form[field.name] = this.generateFormControl(field);
    }
    return new FormGroup(form);
  }

  private generateFormControl(formField: RegistrationField): FormControl {
    const validator = this.generateValidatorFunction(formField);
    return new FormControl('', validator);
  }

  private generateValidatorFunction(formField: RegistrationField): ValidatorFn {
    return control => {
      if (formField.required) {
        if (Validators.required(control)) {
          return { error: `${formField.label} is required` };
        }
      }
      if (formField.validations) {
        for (let validation of formField.validations) {
          const error = this.getValidator(validation)(control);
          if (error) {
            return { error: validation.message };
          }
        }
      }
      return null;
    };
  }

  private getValidator(validation: FieldValidation): ValidatorFn {
    switch (validation.name) {
      case SupportedValidatorsEnum.REGEX:
        return Validators.pattern(<string>validation.value);
      case SupportedValidatorsEnum.MAXLENGTH:
        return Validators.maxLength(<number>validation.value);
      case SupportedValidatorsEnum.MINLENGTH:
        return Validators.minLength(<number>validation.value);
      default:
        return () => null;
    }
  }
}
