import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FormInput, FormSchema } from './form.entity';
import { FormProfile } from './form.mapper';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FormInput.name,
        schema: FormSchema,
      },
    ]),
  ],
  controllers: [FormController],
  providers: [FormService, FormProfile],
  exports: [FormService],
})
export class FormModule {}
