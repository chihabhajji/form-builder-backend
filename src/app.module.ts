import { Module, Scope } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FormModule } from "./form-management/form.module";
import mongoose from "mongoose";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { HttpExceptionFilter } from "./filters/http-exception-filter";
import { UncaughtExceptionFilter } from "./filters/uncaught-exception-filter";

require('dotenv').config();
mongoose.set('strictQuery', true);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL!),
    EventEmitterModule.forRoot(),
    FormModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      scope: Scope.REQUEST,
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'APP_FILTER',
      scope: Scope.DEFAULT,
      useClass: UncaughtExceptionFilter,
    },
  ],
})
export class AppModule {}
