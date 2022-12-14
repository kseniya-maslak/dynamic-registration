import { FieldValidation } from './field-validation.model';

export interface RegistrationField {
  type: 'text' | 'email' | 'phone' | 'password';
  name: string;
  label: string;
  required: boolean;
  validations?: FieldValidation[];
}
