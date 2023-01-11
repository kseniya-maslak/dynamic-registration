import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SupportedValidatorsEnum } from './supported-validators.enum';
import { FieldValidation } from './field-validation.model';

@ValidatorConstraint({ async: false })
export class IsFieldValidationCorrectConstraint
  implements ValidatorConstraintInterface
{
  validate(value: FieldValidation, args: ValidationArguments) {
    switch (value.name) {
      case SupportedValidatorsEnum.MINLENGTH:
      case SupportedValidatorsEnum.MAXLENGTH:
        return 'number' === typeof value.value;
      case SupportedValidatorsEnum.REGEX:
        return 'string' === typeof value.value;
      default:
        return false;
    }
  }
}

export function IsFieldValidationCorrect(
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFieldValidationCorrectConstraint,
    });
  };
}
