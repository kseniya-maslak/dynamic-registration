import { FieldValidation } from './field-validation.model';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsFieldValidationCorrect } from './is-field-validation-correct.validator';
import { SupportedFieldTypesEnum } from './supported-field-types.enum';

export class Field {
  @IsEnum(SupportedFieldTypesEnum)
  type: SupportedFieldTypesEnum;
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  label: string;
  @IsBoolean()
  required: boolean;
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @IsFieldValidationCorrect({ each: true })
  validations?: FieldValidation[];

  constructor(object: Field) {
    this.type = object.type;
    this.name = object.name;
    this.label = object.label;
    this.required = object.required;
    this.validations = object.validations?.map(
      validation => new FieldValidation(validation)
    );
  }
}
