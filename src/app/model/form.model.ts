import { IsArray, ValidateNested } from 'class-validator';
import { Field } from './field.model';

export class Form {
  @IsArray()
  @ValidateNested()
  fields: Field[];
  constructor(fields: Field[]) {
    this.fields = fields.map(field => new Field(field));
  }
}
