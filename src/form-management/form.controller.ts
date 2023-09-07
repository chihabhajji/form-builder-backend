import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO, PaginatedFormDto, UpdateFormDTO } from './form.dto';
import { FormInput, PropertyType } from "./form.entity";

@ApiTags('form-management')
@Controller('form-management')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get('/all')
  async all(
  ): Promise<FormInput[]> {
    return this.formService.all();
  }

  @Get('/one/:id')
  async get(@Param('id') id: string): Promise<FormInput> {
    return this.formService.get(id);
  }

  @Post()
  async create(@Body() form: CreateFormDTO): Promise<FormInput> {
    return this.formService.create(form);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() form: UpdateFormDTO,
    //     TODO: Automapper
  ): Promise<FormInput> {
    return this.formService.update(id, form);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const acknowledged = await this.formService.delete(id);
    if (!acknowledged) {
      throw new ConflictException(`Form with id ${id} not found`);
    }
  }

  @Get('/test')
  test(): FormInput {
    return {
      id: 'test',
      fields:  [
        {
          name: "email",
          label: "Email",
          component: "text",
          type: "email",
          placeholder: "xxx@gmail.com"
        },
        {
          name: "password",
          label: "Password",
          component: "text",
          type: "password",
          placeholder: "********"
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          component: "text",
          type: "password",
          placeholder: "********"
        },
        {
          name: "newPassword",
          label: "New Password",
          component: "text",
          type: "password",
          placeholder: "********"
        },
        {
          name: "isDeveloper",
          label: "Is Developer",
          component: "checkbox"
        },
        {
          name: "bio",
          label: "Bio",
          component: "textarea",
          rows: 3,
        },
        {
          name: "address",
          label: "Address",
          component: "text",
          type: "address",
          placeholder: "xxx city",
        },
        {
          name: "gender",
          label: "Gender",
          component: "radioGroup",
          options: [
            {
              value: "FEMALE",
              label: "Female"
            },
            {
              value: "MALE",
              label: "Male"
            },
            {
              value: "OTHER",
              label: "Other"
            }
          ]
        },
        {
          name: "title",
          label: "Title",
          component: "select",
          options: [
            {
              value: "Mr",
              label: "Mr"
            },
            {
              value: "Mrs",
              label: "Mrs"
            },
            {
              value: "Miss",
              label: "Miss"
            },
            {
              value: "Dr",
              label: "Dr"
            }
          ]
        },
        {
          name: "mood",
          label: "Mood",
          component: "select",
          options: [
            {
              value: "GREATE",
              label: "😀"
            },
            {
              value: "UPSET",
              label: "😥"
            },
            {
              value: "ANGRY",
              label: "😡"
            },
            {
              value: "INLOVE",
              label: "🥰"
            },
            {
              value: "SCARED",
              label: "😱"
            },
            {
              value: "COLD",
              label: "🥶"
            },
            {
              value: "SICK",
              label: "🤢"
            }
          ],
          multiple: true
        }
      ],
      properties: {
        email: {
          type: PropertyType.STRING,
          format: 'email',
          minLength: 1,
          errorMessage: {
            required: 'Email is required',
            minLength: 'Email is required',
            format: 'Email is invalid',
          },
        },
        password: {
          type: PropertyType.STRING,
          minLength: 1,
          errorMessage: {
            required: 'Password is required',
            minLength: 'Password is required',
          },
        },
        confirmPassword: {
          type: PropertyType.STRING,
          minLength: 1,
          const: { $data: '1/password' },
          errorMessage: {
            required: 'Confirm password is required',
            minLength: 'Confirm password is required',
            const: 'Confirm password must match current password',
          },
        },
        newPassword: {
          type: PropertyType.STRING,
          minLength: 1,
          not: { const: { $data: '1/password' } },
          errorMessage: {
            required: 'New password is required',
            minLength: 'New password is required',
            not: 'New password must differ from current password',
          },
        },
        isDeveloper: {
          type: PropertyType.BOOLEAN,
          const: true,
          errorMessage: {
            type: 'Is developer is required',
            required: 'Is developer is required',
            const: 'Is developer is required',
          },
        },
        bio: {
          type: PropertyType.STRING,
          minLength: 1,
          maxLength: 20,
          errorMessage: {
            required: 'Bio is required',
            minLength: 'Bio is required',
            maxLength: 'Bio must be no longer than 20 characters',
          },
        },
        gender: {
          type: PropertyType.STRING,
          enum: ['FEMALE', 'MALE'],
          errorMessage: {
            required: 'Gender is required',
            enum: 'Gender must be equal to one of Female, Male',
          },
        },
        title: {
          type: PropertyType.STRING,
          minLength: 1,
          errorMessage: {
            required: 'Title is required',
            minLength: 'Title is required',
          },
        },
        fullName: {
          type: PropertyType.STRING,
          minLength: 1,
          errorMessage: {
            required: 'Full Name is required',
            minLength: 'Full Name is required',
          },
        },
        dob: {
          type: PropertyType.STRING,
          minLength: 1,
          minDate: new Date('2024-07-16').toISOString(),
          maxDate: new Date('2024-07-20').toISOString(),
          errorMessage: {
            required: 'Date of birth is required',
            minLength: 'Date of birth is required',
            minDate: 'Dob is no sooner than 2024-07-16',
            maxDate: 'Dob is no later than 2024-07-20',
          },
        },
        weight: {
          type: PropertyType.NUMBER,
          minimum: 1, // 63 kg
          errorMessage: {
            type: 'Weight is required',
            required: 'Weight is required',
            minimum: 'Weight is required',
          },
        },
        height: {
          type: PropertyType.NUMBER,
          minimum: 1,
          maximum: 250, // 172 cm
          errorMessage: {
            type: 'Height is required',
            required: 'Height is required',
            minimum: 'Height is required',
            maximum: 'Height is too height',
          },
        },
        mood: {
          type: PropertyType.ARRAY,
          minItems: 1,
          errorMessage: {
            required: 'Mood is required',
            minItems: 'Mood is required',
          },
        },
      },
      required: [
        'email',
        'password',
        'confirmPassword',
        'newPassword',
        'isDeveloper',
        'gender',
        'title',
        'bio',
        'fullName',
        'dob',
        'weight',
        'height',
        'mood',
      ],
    };
  }
}
