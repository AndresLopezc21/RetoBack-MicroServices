import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './taskservice.entity';
import { CreateTaskDto, UpdateTaskDto} from './dto/task.dto';

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

    async findAll(page: number, limit: number): Promise<TaskEntity[]> {
        const skip = (page - 1) * limit;
        
        return await this.taskRepository.find({
          skip,
          take: limit,
        });
      }

      async findByUser(userId: number, page: number, limit: number): Promise<TaskEntity[]> {
        const user = await this.taskRepository.findOne({ where: { userId } });
        if (!user) {
            throw new NotFoundException(`No existe una tarea con el id introducido`);
        }
        const [tasks, total] = await this.taskRepository.findAndCount({
            where: { userId },
            take: limit,
            skip: (page - 1) * limit,
        });
        
        return tasks;
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        // Buscar la tarea usando un objeto con 'where'
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`No se encontró una tarea con el id introducido`);
        }

        // Actualiza los campos de la tarea
        task.title = updateTaskDto.title ?? task.title;
        task.description = updateTaskDto.description ?? task.description;
        task.status = updateTaskDto.status ?? task.status;

        await this.taskRepository.save(task);
        return task;
    }
    
    async deleteTask(id: number): Promise<{ message: string }> {
        const task = await this.taskRepository.findOne({ where: { id } });

        if (!task) {
            throw new NotFoundException('La tarea con ID correspondiente no existe');
        }

        await this.taskRepository.delete(id);
        return { message: 'Tarea eliminada correctamente' };
    }
  }