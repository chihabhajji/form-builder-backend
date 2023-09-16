import {ApiProduces, ApiTags} from '@nestjs/swagger';
import {
    Body,
    ConflictException, ConsoleLogger,
    Controller,
    Delete,
    Get, Header,
    Param,
    Post,
    Put, Req, Sse,
} from '@nestjs/common';
import {FormService} from './form.service';
import {FormInput} from './form.entity';
import {Component, FormType, PropertyType} from './form.enum';
import {CreateFormDTO} from './form.dto';
import {fromEvent, map, tap} from "rxjs";
import {Request} from "express";
import {FORM_ANSWER_CREATED, FORM_DELETED} from "./form.constants";
import {FormAnsweredEvent} from "./form.events";
import {TEST_FORM_DATA} from "./form.data";

@ApiTags('form-management')
@Controller('form-management')
export class FormController {
    private readonly logger = new ConsoleLogger(FormController.name);
    constructor(private readonly formService: FormService) {
    }

    @Get('/all')
    async all(): Promise<FormInput[]> {
        const result = await this.formService.all();
        this.logger.log(`Found ${result.length} forms.`);
        result.push(TEST_FORM_DATA)
        return result;
    }

    @Get('/one/:id')
    async get(@Param('id') id: string): Promise<FormInput> {
        if(id === "test") return TEST_FORM_DATA;
        return this.formService.get(id);
    }

    @Post()
    async create(@Body() form: CreateFormDTO): Promise<FormInput> {
        return this.formService.create(form);
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() form: FormInput,
    ): Promise<FormInput> {
        if(id === "test") return TEST_FORM_DATA;
        return this.formService.update(id, form);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        const acknowledged = await this.formService.delete(id);
        if (!acknowledged) {
            throw new ConflictException(`Form with id ${id} not found`);
        }
    }

    @Put('/submit/:formId')
    async submitFormAnswer(
        @Param('formId') formId: string,
        @Body() body: Record<string, string | []>,
    ): Promise<FormInput> {
        if(formId === "test") return TEST_FORM_DATA;
        return this.formService.submitAnswer(formId, body);
    }

    @Get('/test')
    test(): FormInput {
        return TEST_FORM_DATA
    }

    @ApiProduces('text/event-stream')
    @Sse('sse')
    @Header('X-Accel-Buffering', 'no')
    sse(@Req() req: Request,) {
        return fromEvent(this.formService.eventEmitter, FORM_ANSWER_CREATED)
            .pipe(
                tap((data : MessageEvent<FormAnsweredEvent>) => this.logger.log(`Forwarding event ${data.type} to ${req.ip}.`)),
                map((data: MessageEvent<FormAnsweredEvent>) => {
                    return new MessageEvent(data.type, {
                        data,
                        lastEventId: new Date().toISOString(),
                    });
                }),
            );
    }
}
