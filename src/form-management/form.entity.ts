import { Schema, SchemaFactory } from '@nestjs/mongoose';


export enum PropertyType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  ARRAY= 'array',
  OBJECT = 'object',
  // DATE = 'date',
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
  fileType?: string[];
  fileMaximum?: number;
  minDate?: string;
  maxDate?: string;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  errorMessage?: ErrorMessage;
}


@Schema({
  timestamps: true,
  versionKey: false,
  _id: false,
  id: true,
  virtuals: true,
})
export class FormInput {
  declare id: string;
  properties: Record<string, PropertySchema>;
  required: string[];
  additionalProperties?: boolean;
  fields?: Field[];
}

export const FormSchema = SchemaFactory.createForClass(FormInput);



