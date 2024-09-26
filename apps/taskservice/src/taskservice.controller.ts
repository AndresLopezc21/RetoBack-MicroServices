import { Controller, Get } from '@nestjs/common';
import { TaskserviceService } from './taskservice.service';

@Controller()
export class TaskserviceController {
  constructor(private readonly taskserviceService: TaskserviceService) {}

  @Get()
  getHello(): string {
    return this.taskserviceService.getHello();
  }
}
