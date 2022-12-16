import { IsEnum, IsString, MinLength } from 'class-validator';
import { SupportedValidatorsEnum } from './supported-validators.enum';

export class FieldValidation {
  @IsEnum(SupportedValidatorsEnum)
  name: string = '';
  @IsString()
  @MinLength(1)
  message: string = '';
  value: string | number = '';

  constructor(object: FieldValidation) {
    this.name = object.name;
    this.message = object.message;
    this.value = object.value;
  }
}
