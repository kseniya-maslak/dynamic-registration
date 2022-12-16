import { FieldValidation } from './field-validation.model';
import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class RegistrationField {
  @IsIn(['text', 'email', 'phone', 'password'])
  type: 'text' | 'email' | 'phone' | 'password' = 'text';
  @IsString()
  @MinLength(1)
  name: string = '';
  @IsString()
  @MinLength(1)
  label: string = '';
  @IsBoolean()
  required: boolean = false;
  @IsOptional()
  @ValidateNested()
  validations?: FieldValidation[];

  constructor(object: RegistrationField) {
    this.name = object.name;
    this.label = object.label;
    this.required = object.required;
    this.validations = object.validations?.map(validation => {
      return new FieldValidation(validation);
    });
  }
}
