import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './taskservice.entity';
import { CreateTaskDto} from './dto/task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    }

    async findAll(): Promise<TaskEntity[]> {
        return await this.taskRepository.find();
      }
  }

/*
    async findAll(): Promise<TaskEntity[]> {
        return await this.taskRepository.find();
    }

    async findByUserId(userId: number): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ where: { userId } });
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
      await this.taskRepository.update(id, updateTaskDto);
      return this.taskRepository.findOne({ where: { id } }); 
  }

    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}*/