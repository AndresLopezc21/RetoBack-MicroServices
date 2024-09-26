import { NestFactory } from '@nestjs/core';
import { TaskModule } from './taskservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(TaskModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8878 },
  });
  
  await microservice.listen();

}
bootstrap();
