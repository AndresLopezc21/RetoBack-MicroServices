// src/app.controller.ts
import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto, UpdateUserDto, UserIdDto } from './dto/user.dto'; 
import { AppEntity } from './app.entity';

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: 'create_user' })
    async createUser(data: CreateUserDto) {
    return await this.appService.createUser(data.nombre, data.email);
    }

    @MessagePattern({ cmd: 'get_users' })
    async findAll(data: { page: number; limit: number }): Promise<AppEntity[]> {
        const { page, limit } = data;
        return await this.appService.findAll(page, limit);
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