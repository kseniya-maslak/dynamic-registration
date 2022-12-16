import { IsEnum, IsString, MinLength } from 'class-validator';
import { SupportedValidatorsEnum } from './supported-validators.enum';
import { IsStringOrNumber } from './is-string-or-number.validator';

export class FieldValidation {
  @IsEnum(SupportedValidatorsEnum)
  name: string = '';
  @IsString()
  @MinLength(1)
  message: string = '';
  @IsStringOrNumber()
  value: string | number = '';

  constructor(object: FieldValidation) {
    this.name = object.name;
    this.message = object.message;
    this.value = object.value;
  }
}
