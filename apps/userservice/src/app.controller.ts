import { Controller, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: { nombre: string; email: string }) {
    return await this.appService.createUser(data.nombre, data.email);
  }

  @MessagePattern({ cmd: 'get_users' })
  async findAll(data: any) {
    return await this.appService.findAll(data.page || 1, data.limit || 10);
  }

  @MessagePattern({ cmd: 'get_user' })
  async findOne(data: { id: number }) {
    return await this.appService.findOne(data.id);
  }
  @MessagePattern({ cmd: 'update_user' })
  async updateUser(data: { id: number; nombre: string; email: string }) {
    return await this.appService.updateUser(data.id, data.nombre, data.email);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(data: { id: number }) {
    return await this.appService.deleteUserById(data.id);
}
}