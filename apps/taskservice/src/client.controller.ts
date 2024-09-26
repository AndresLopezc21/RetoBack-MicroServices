import { Controller, Post, Body, Get, Query, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/task.dto';
import { TaskEntity } from './taskservice.entity';

@Controller('tasks')
export class ClientController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 8878 }, // Asegúrate de que este puerto coincide con el del microservicio
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
  async getAllTasks() {
    return this.client.send({ cmd: 'get_all_tasks' }, {});
  }
}
 /* @Get()
  async getAllTasks() {
    return await this.client.send({ cmd: 'get_all_tasks' }, {}).toPromise();
  }

  @Get('task')
  async getTask(@Query('id') id: number) {
    try {
      const task = await this.client.send({ cmd: 'get_task' }, { id }).toPromise();
      if (!task) {
        throw new HttpException('La tarea con ID correspondiente no existe', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('user/tasks')
  async getTasksByUserId(@Query('userId') userId: number) {
    return await this.client.send({ cmd: 'get_tasks_by_user' }, { userId }).toPromise();
  }

  @Put('update')
  async updateTask(@Query('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.client.send({ cmd: 'update_task' }, { id, ...updateTaskDto }).toPromise(); 
    } catch (error) {
      throw new HttpException('Error al actualizar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('task')
  async deleteTask(@Query('id') id: number) {
    try {
      return await this.client.send({ cmd: 'delete_task' }, { id }).toPromise();
    } catch (error) {
      throw new HttpException('Error al eliminar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}*/