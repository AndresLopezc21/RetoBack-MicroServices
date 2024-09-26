import { Controller, Post, Body, Get, Query, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('client')
export class ClientController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 8877 }, // Asegúrate de que este puerto coincide con el del microservicio
    });
  }

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.client.send({ cmd: 'create_user' }, createUserDto); 
    } catch (error) {
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('users')
  async getAllUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }

  @Get('user')
  async getUser(@Query('id') id: number) {
      try {
          const user = await this.client.send({ cmd: 'get_user' }, { id }).toPromise();

          if (!user) {
              throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
          }

          return user;
      } catch (error) {
          if (error.response) {
              throw new HttpException(error.response.message || 'Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
          }
          throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Post('update-user')
  async updateUser(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.client.send({ cmd: 'update_user' }, { id, ...updateUserDto }); 
    } catch (error) {
      if (error.response && error.response.statusCode === 404) {
        throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
      } else if (error.response && error.response.statusCode === 409) {
        throw new HttpException('El email ya está en uso', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error interno al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('user')
  async deleteUser(@Query('id') id: number) {
      try {
          return await this.client.send({ cmd: 'delete_user' }, { id }).toPromise();
      } catch (error) {
          if (error.response && error.response.statusCode === 404) {
              throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}