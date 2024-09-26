import { Module } from '@nestjs/common';
import { TaskserviceController } from './taskservice.controller';
import { TaskserviceService } from './taskservice.service';

@Module({
  imports: [],
  controllers: [TaskserviceController],
  providers: [TaskserviceService],
})
export class TaskserviceModule {}
