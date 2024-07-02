import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Shopping Mall Rest API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/rest/docs', app, document);

  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
