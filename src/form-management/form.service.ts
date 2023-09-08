import {
  ConflictException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FormInput } from './form.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFormDTO } from './form.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  FORM_ANSWER_CREATED,
  FORM_CREATED,
  FORM_DELETED,
  FORM_UPDATED,
} from './form.constants';
import {
  FormAnsweredEvent,
  FormCreatedEvent,
  FormDeletedEvent,
  FormUpdatedEvent,
} from './form.events';

@Injectable()
export class FormService {
  private readonly logger = new ConsoleLogger(FormService.name);
  constructor(
    @InjectModel(FormInput.name) private formModel: Model<FormInput>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async all(): Promise<FormInput[]> {
    return this.formModel.find();
  }
  async update(id: string, newForm: FormInput): Promise<FormInput> {
    const session = await this.formModel.db.startSession();
    session.startTransaction();

    try {
      const formToUpdate = await this.formModel.findById(id).session(session);
      if (!formToUpdate) {
        // noinspection ExceptionCaughtLocallyJS
        throw new NotFoundException('Form not found');
      }
      const required = formToUpdate.required;
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

      return formToUpdate;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      this.eventEmitter.emit(FORM_UPDATED, new FormUpdatedEvent(id));
      session.endSession().then(() => this.logger.debug('Session ended'));
    }
  }

  async delete(_id: string): Promise<FormInput> {
    return this.formModel
      .findByIdAndDelete(_id)
      .orFail(new NotFoundException('Form not found'))
      .then((form) => {
        this.eventEmitter.emit(FORM_DELETED, new FormDeletedEvent(form._id));
        return form;
      });
  }

  create(form: CreateFormDTO): Promise<FormInput> {
    return this.formModel.create(form).then((form) => {
      this.eventEmitter.emit(FORM_CREATED, new FormCreatedEvent(form._id));
      return form;
    });
  }

  async get(id: string): Promise<FormInput> {
    return this.formModel
      .findById(id)
      .orFail(new NotFoundException('Form not found'));
  }

  async submitAnswer(
    id: string,
    answer: Record<string, unknown>,
  ): Promise<FormInput> {
    const form = await this.formModel
      .findById(id)
      .orFail(new NotFoundException('Form not found'));
    if (!form.answers) {
      form.answers = [];
    }
    form.answers.push(answer);
    await form.save();
    this.eventEmitter.emit(
      FORM_ANSWER_CREATED,
      new FormAnsweredEvent(form._id),
    );
    return form;
  }
  @OnEvent(FORM_CREATED)
  @OnEvent(FORM_UPDATED)
  @OnEvent(FORM_DELETED)
  @OnEvent(FORM_ANSWER_CREATED)
  async handleFormEvents(
    payload:
      | FormCreatedEvent
      | FormUpdatedEvent
      | FormDeletedEvent
      | FormAnsweredEvent,
  ) {
    const { id, message } = payload;
    this.logger.log(`Form ${message}: ${id}`);
  }
}