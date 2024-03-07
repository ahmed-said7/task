import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { catchExceptionsFilter } from './filters/base.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new catchExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(6500);
}
bootstrap();
