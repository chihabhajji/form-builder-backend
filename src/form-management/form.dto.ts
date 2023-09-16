import { Field, PropertySchema } from "./form.entity";

export class CreateFormDTO {
  properties: Record<string, PropertySchema>;
  required: string[];
  fields?: Field[];
  campaignName: string;
}
