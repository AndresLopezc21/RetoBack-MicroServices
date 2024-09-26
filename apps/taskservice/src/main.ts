import { NestFactory } from '@nestjs/core';
import { TaskserviceModule } from './taskservice.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskserviceModule);
  await app.listen(3000);
}
bootstrap();
