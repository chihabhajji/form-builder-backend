import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { FormInput } from "./form.entity";

@Injectable()
export class FormSeeder implements Seeder {
  constructor(@InjectModel(FormInput.name) private readonly forms: Model<FormInput>) {}

  async seed() {
    const forms = DataFactory.createForClass(FormInput).generate(20);
    return this.forms.insertMany(forms);
  }

  async drop(){
    return this.forms.deleteMany({});
  }
}