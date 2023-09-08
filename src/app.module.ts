import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { FormModule } from "./form-management/form.module";
import mongoose from "mongoose";

mongoose.set('strictQuery', true);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL!),
    FormModule
  ],
})
export class AppModule {}
