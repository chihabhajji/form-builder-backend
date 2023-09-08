// import { FormInput } from "./form.entity";
// import { FormType } from "./form-type.enum";
// import { AnySchemaObject } from 'ajv';
// import { Component } from "./FormComponent";
//
// export class PaginatedFormDto {
//   data: FormInput[];
//   count: number;
// }
//
import { Prop } from "@nestjs/mongoose";
import { Field, PropertySchema } from "./form.entity";

export class CreateFormDTO {
  properties: Record<string, PropertySchema>;
  required: string[];
  fields?: Field[];
}
//
// export class OptionType
// { value: string; label: string }
// export class Ibput {
//   name: string;
//   label?: string;
//   component: Component;
//   type?: 'address' | 'email' | 'password';
//   placeholder?: string;
//   rows?: number;
//   options?: OptionType[];
//   multiple?: boolean;
// }
// export class CreateFormDTO {
//   fields: Ibput[];
//   required: string[];
// }
// export class FormSchemaDTO {
// type: AnySchemaObject
// }