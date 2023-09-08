import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Component } from "./FormComponent";


export enum PropertyType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  ARRAY= 'array',
  OBJECT = 'object',
  DATE = 'date',
}

export class ErrorMessage {
  required?: string;
  minLength?: string;
  maxLength?: string;
  format?: string;
  const?: string;
  not?: string;
  type?: string;
  pattern?: string;
  enum?: string;
  fileType?: string;
  fileMaximum?: string;
  minDate?: string;
  maxDate?: string;
  minimum?: string;
  maximum?: string;
  minItems?: string;
}
export class PropertySchema {
  type: PropertyType;
  format?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  const?: any;
  not?: any;
  enum?: string[];
  minDate?: string;
  maxDate?: string;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  errorMessage?: ErrorMessage;
}

export enum FormType {
  ADDRESS = 'address',
  EMAIL = 'email',
  PASSWORD = 'password',
  DATE = 'date',
}

export class OptionType { value: string; label: string }
export class Field  {
  name: string;
  label?: string;
  component: Component;
  type?: FormType;
  placeholder?: string;
  rows?: number;
  options?: OptionType[];
  multiple?: boolean;
};

@Schema({
  timestamps: true,
  versionKey: false,
})
export class FormInput {
  declare _id: string;
  @Prop({
    type: Map,
    of: Object,
  })
  properties: Record<string, PropertySchema>;
  @Prop()
  required: string[];
  @Prop({
    type: [Map],
  })
  fields?: Field[];
}

class Answers {
  userEmail: string;
  @Prop({
    type: Map,
  })
  answers: Record<string, any>;
}

export const FormSchema = SchemaFactory.createForClass(FormInput);



