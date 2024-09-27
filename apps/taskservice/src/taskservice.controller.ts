import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './taskservice.service';
import { CreateTaskDto, GetTasksByUserDto, TaskIdDto, UpdateTaskDto } from './dto/task.dto';
import { TaskEntity } from './taskservice.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'create_task' })
  async createTask(data: CreateTaskDto): Promise<TaskEntity> {
      return await this.taskService.createTask(data);
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  async findAll(data: { page: number; limit: number }): Promise<TaskEntity[]> {
    return await this.taskService.findAll(data.page, data.limit);
  }

    @MessagePattern({ cmd: 'get_tasks_by_user' })
    async findByUser(data: GetTasksByUserDto) {
        return await this.taskService.findByUser(data.userId);
    }

    @MessagePattern({ cmd: 'edit_task' })
    async editTask(@Payload('id') id: number, @Payload() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
      return await this.taskService.updateTask(id, updateTaskDto);
    }

    @MessagePattern({ cmd: 'delete_task' })
    async deleteTask(@Payload() data: TaskIdDto) {
        return await this.taskService.deleteTask(data.id);
    }
  
}
