import {
  AutomapperProfile,
  InjectMapper,
} from '@timonmasberg/automapper-nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { FormInput } from './form.entity';
import { CreateFormDTO, PaginatedFormDto, UpdateFormDTO } from './form.dto';

@Injectable()
export class FormProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => [
      createMap(mapper, FormInput, PaginatedFormDto),
      createMap(mapper, CreateFormDTO, FormInput),
      createMap(mapper, UpdateFormDTO, FormInput),
    ];
  }
}
