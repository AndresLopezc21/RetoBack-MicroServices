import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplicar validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS
  app.enableCors();

  // Escuchar en el puerto 3000
  await app.listen(3000);
}
bootstrap();