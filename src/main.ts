import { type INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    origin: '*'
  })
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  initSwagger(app);
  await app.listen(port);
  Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

function initSwagger(app: INestApplication) {
  if (process.env.NODE_ENV !== 'production') {
    patchNestJsSwagger();
    const config = new DocumentBuilder()
        .setTitle('form-builder-api')
        .addServer('http://localhost:3000')
        .addBearerAuth({
          name: 'Authorization',
          description: `Please enter token in following format: Bearer <JWT>`,
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'header',
        })
        .addSecurityRequirements('Authorization')
        .build();
    SwaggerModule.setup(
        'swagger',
        app,
        SwaggerModule.createDocument(app, config, {
          operationIdFactory: (controllerKey, methodKey) => methodKey,
          deepScanRoutes: true,
        }),
        {
          yamlDocumentUrl: '/yaml',
          jsonDocumentUrl: '/json',
          swaggerOptions: {
            persistAuthorization: true,
          },
        },
    );
  }
}

bootstrap();
