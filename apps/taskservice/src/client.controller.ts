import { Controller, Post, Body, Get, Query, Delete, Put, HttpStatus, HttpException, Param } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateTaskDto, GetTasksByUserDto, TaskStatus, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class ClientController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 8878 }, 
    });
  }

  @Post('create-task')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
      try {
          return this.client.send({ cmd: 'create_task' }, createTaskDto);
      } catch (error) {
          throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
  @Get('tasks')
  async getAllTasks(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.client.send({ cmd: 'get_all_tasks' }, { page, limit });
  }

  @Get('tasks-by-userid')
    async getTasksByUser(@Query('userId') userId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    try {
        const parsedUserId = parseInt(userId, 10); 

        if (isNaN(parsedUserId)) {
            throw new HttpException('El userId debe ser un número', HttpStatus.BAD_REQUEST);
        }
        const user = this.client.send({ cmd: 'get_user' }, { userId: parsedUserId });
        if (!user) {
            throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
        }
        return  this.client.send({ cmd: 'get_tasks_by_user' }, { userId: parsedUserId, page, limit });
    } catch (error) {
        if (error.response) {
            throw new HttpException(error.response.message || 'Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Post('edit-task')
async editTask(@Query('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    if (!id) {
        throw new HttpException('El ID no puede estar vacío', HttpStatus.BAD_REQUEST);
    }
    if (isNaN(id)) {
        throw new HttpException('El ID debe ser un número entero', HttpStatus.BAD_REQUEST);
    }

    const task = this.client.send({ cmd: 'get_task' }, { id });
    
    if (!task) {
        throw new HttpException('No se encontró una tarea con el ID correspondiente', HttpStatus.NOT_FOUND);
    }

    if (updateTaskDto.status && !Object.values(TaskStatus).includes(updateTaskDto.status)) {
        throw new HttpException('El status no es válido', HttpStatus.BAD_REQUEST);
    }
    return this.client.send({ cmd: 'edit_task' }, { id, ...updateTaskDto });
}

@Delete('delete')
async deleteTask(@Query('id') id: number) {
    try {
        return this.client.send({ cmd: 'delete_task' }, { id });
    } catch (error) {
        if (error.response && error.response.statusCode === 404) {
            throw new HttpException('La tarea con el id correspondiente no existe', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Error al eliminar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
