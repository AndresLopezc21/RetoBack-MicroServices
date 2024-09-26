// src/app.controller.ts
import { Controller, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto, UpdateUserDto, UserIdDto } from './dto/user.dto'; 

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: 'create_user' })
    async createUser(data: CreateUserDto) {
    return await this.appService.createUser(data.nombre, data.email);
    }

    @MessagePattern({ cmd: 'get_users' })
    async findAll(data: any) {
        return await this.appService.findAll();
    }

    @MessagePattern({ cmd: 'get_user' })
    async findOne(data: UserIdDto) {
        return await this.appService.findOne(data.id);
    }

    @MessagePattern({ cmd: 'update_user' })
    async updateUser(data: { id: number } & UpdateUserDto) {
      return await this.appService.updateUser(data.id, data);
    }
    
    @MessagePattern({ cmd: 'delete_user' })
    async deleteUser(data: UserIdDto) {
        return await this.appService.deleteUserById(data.id);
    }
}