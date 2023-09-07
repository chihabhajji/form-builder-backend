import { FormInput } from "./form.entity";
import { FormType } from "./form-type.enum";
import { AnySchemaObject } from 'ajv';

export class PaginatedFormDto {
  data: FormInput[];
  count: number;
}

export class UpdateFormDTO {
  label: string;
  type: FormType;
  options?: string[];
}

export class CreateFormDTO {
  label: string;
  key: string;
  type: FormType;
  options?: string[];
}

export class FormSchemaDTO {
type: AnySchemaObject
}