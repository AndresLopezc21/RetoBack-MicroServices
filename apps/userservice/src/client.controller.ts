import { Controller, Post, Body, Get, Query, Delete, Put, HttpStatus, HttpException, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, UserIdDto } from './dto/user.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('client')
export class ClientController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 8877 }, 
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
    async getAllUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.client.send({ cmd: 'get_users' }, { page, limit });
    }

    @Get('user')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUser(@Query('id', ParseIntPipe) id: number) {
      try {
        const user = await firstValueFrom(
          this.client.send({ cmd: 'get_user' }, { id }).pipe(
            catchError((error) => {
              throw new HttpException(
                `Error en el servicio remoto: ${error.message || 'Error desconocido'}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            })
          )
        );
        if (!user) {
          throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
        }
        return user;
      } catch (error) {
        if (error instanceof HttpException) {
          throw error; 
        }
        throw new HttpException(
          `Error interno del servidor: ${error.message || 'Error desconocido'}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Post('update-user')
    async updateUser(
      @Query('id') id: number,
      @Body() updateUserDto: UpdateUserDto
    ) {
      if (!id) {
        throw new HttpException('El ID no puede estar vacío', HttpStatus.BAD_REQUEST);
      }
      if (isNaN(id)) {
        throw new HttpException('El ID debe ser un número entero', HttpStatus.BAD_REQUEST);
      }
      try { const user = await this.client.send({ cmd: 'get_user' }, { id }).toPromise();

      if (!user) {
        throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
      }

      return this.client.send({ cmd: 'update_user' }, { id, ...updateUserDto }).toPromise();
    } catch (error) {
      if (error.response && error.response.statusCode === 404) {
        throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
      } else if (error.response && error.response.statusCode === 409) {
        throw new HttpException('El email ya está en uso por otro usuario', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error interno al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('user')
  async deleteUser(@Query('id') id: number) {
      try {
          return this.client.send({ cmd: 'delete_user' }, { id });
      } catch (error) {
          if (error.response && error.response.statusCode === 404) {
              throw new HttpException('El usuario con ID correspondiente no existe', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}