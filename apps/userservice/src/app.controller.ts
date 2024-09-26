import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body('nombre') nombre: string, @Body('email') email: string) {
    return this.appService.createUser(nombre, email);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.appService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body('nombre') nombre: string,
    @Body('email') email: string,
  ) {
    return this.appService.updateUser(id, nombre, email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.appService.deleteUser(id);
  }
}