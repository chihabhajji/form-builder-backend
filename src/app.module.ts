import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { FormModule } from "./form-management/form.module";
import { AutomapperModule } from "@timonmasberg/automapper-nestjs";
import { classes } from "@automapper/classes";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chihab:JmILhx418KzmkYic@cluster0.4eh6xyz.mongodb.net/?retryWrites=true&w=majority'),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    FormModule
  ],
})
export class AppModule {}
