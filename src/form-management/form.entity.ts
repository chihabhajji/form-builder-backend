import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Component, FormType, PropertyType} from './form.enum';
import {faker} from "@faker-js/faker";

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

export class OptionType {
    value: string;
    label: string;
}

export class Field {
    name: string;
    label?: string;
    component: Component;
    type?: FormType;
    placeholder?: string;
    rows?: number;
    options?: OptionType[];
    multiple?: boolean;
}

@Schema({
    timestamps: true,
    versionKey: false,
})
export class FormInput {
    declare _id: string;
    @Prop({
        default(_) {
            return faker.company.name();
        }
    })
    campaignName: string;
    @Prop({
        type: Map,
        of: Object,
    })
    properties: Record<string, PropertySchema>;
    @Prop()
    required: string[];
    @Prop({
        type: [Object],
    })
    fields?: Field[];
    @Prop({
        type: [Map],
    })
    answers?: Record<string, unknown>[];
}

export const FormSchema = SchemaFactory.createForClass(FormInput);
