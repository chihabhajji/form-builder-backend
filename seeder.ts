import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { FormInput, FormSchema } from "./src/form-management/form.entity";
import { FormSeeder } from "./src/form-management/form.seeder";
require('dotenv').config();

function seedModel(modelName: string, modelSchema: any, modelSeeder: any) {
  seeder({
    imports: [
      MongooseModule.forRoot(process.env.DATABASE_URL!),
      MongooseModule.forFeature([{ name: modelName, schema: modelSchema }]),
    ],
  }).run([modelSeeder]);
}

seedModel(FormInput.name, FormSchema, FormSeeder);