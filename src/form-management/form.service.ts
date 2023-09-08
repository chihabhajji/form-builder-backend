import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { FormInput } from './form.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFormDTO } from "./form.dto";

@Injectable()
export class FormService {
  constructor(
    @InjectModel(FormInput.name) private formModel: Model<FormInput>,
  ) {}
  async all(): Promise<FormInput[]> {
    return this.formModel.find();
  }
  async update(id: string, newForm: FormInput): Promise<FormInput> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const formToUpdate = await this.formModel.findById(id).session(session);

      if (!formToUpdate) {
        throw new NotFoundException('Form not found');
      }
      const required = formToUpdate.required;
      const fields = formToUpdate.fields;
      newForm.required.every((field) => {
        if (!required.includes(field)) {
          throw new ConflictException('Cannot remove required field');
        }
      });
      formToUpdate.required = newForm.required;

      formToUpdate.fields = newForm.fields;
      formToUpdate.properties = newForm.properties;

      await formToUpdate.save();

      await session.commitTransaction();
      await session.endSession();

      return formToUpdate;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async delete(_id: string): Promise<FormInput> {
    return this.formModel
      .findByIdAndDelete(_id)
      .orFail(new NotFoundException('Form not found'));
  }

  create(form: CreateFormDTO): Promise<FormInput> {
    return this.formModel.create(form);
  }

  async get(id: string): Promise<FormInput> {
    return this.formModel
      .findById(id)
      .orFail(new NotFoundException('Form not found'));
  }
}