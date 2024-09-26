import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskService } from './taskservice.service';
import { CreateTaskDto } from './dto/task.dto';
import { TaskEntity } from './taskservice.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  async createTask(data: CreateTaskDto): Promise<TaskEntity> {
      return await this.taskService.createTask(data);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.findAll();
  }
}
  /*
  @MessagePattern({ cmd: 'get_all_tasks' })
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.findAll();
  }

  @MessagePattern({ cmd: 'get_task' })
  async findById(data: TaskIdDto): Promise<TaskEntity> {
    return await this.taskService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'get_tasks_by_user' })
  async findByUserId(data: UserIdDto): Promise<TaskEntity[]> {
    return await this.taskService.findByUserId(data.userId);
  }

  @MessagePattern({ cmd: 'update_task' })
  async updateTask(data: TaskIdDto & UpdateTaskDto): Promise<TaskEntity> {
    return await this.taskService.updateTask(data.id, data);
  }

  @MessagePattern({ cmd: 'delete_task' })
  async deleteTask(data: TaskIdDto): Promise<void> {
    return await this.taskService.deleteTask(data.id);
  }
}*/