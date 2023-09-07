import { Injectable, NotFoundException } from '@nestjs/common';
import { FormInput } from './form.entity';
import { CreateFormDTO, UpdateFormDTO } from './form.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(FormInput.name) private formModel: Model<FormInput>,
  ) {}
  async all(): Promise<FormInput[]> {
    return this.formModel.find();
  }
  async update(id: string, form: UpdateFormDTO): Promise<FormInput> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const formToUpdate = await this.formModel.findById(id).session(session);

      if (!formToUpdate) {
        throw new Error('Form not found');
      }

      // Update the fields
      // formToUpdate.label = form.label;
      // formToUpdate.type = form.type;
      // formToUpdate.options = form.options;
      // TODO : Logic here

      await formToUpdate.save();

      await session.commitTransaction();
      session.endSession();

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