import { IsArray, ValidateNested } from 'class-validator';
import { RegistrationField } from './registration-field.model';

export class RegistrationForm {
  @IsArray()
  @ValidateNested()
  form: RegistrationField[];
  constructor(form: RegistrationField[]) {
    this.form = form.map(field => new RegistrationField(field));
  }
}
