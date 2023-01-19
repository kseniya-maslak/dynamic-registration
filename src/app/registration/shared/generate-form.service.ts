import { Injectable } from '@angular/core';
import { Field } from '../../model/field.model';
import { FormControl, FormGroup } from '@angular/forms';
import { GenerateValidatorService } from './generate-validator.service';

@Injectable()
export class GenerateFormService {
  constructor(private validatorService: GenerateValidatorService) {}

  generateForm(registrationFields: Field[]) {
    let form: { [key: string]: FormControl } = {};
    for (let field of registrationFields) {
      form[field.name] = this.generateFormControl(field);
    }
    return new FormGroup(form);
  }

  private generateFormControl(formField: Field): FormControl {
    const validator =
      this.validatorService.generateValidatorFunction(formField);
    return new FormControl('', validator);
  }
}
