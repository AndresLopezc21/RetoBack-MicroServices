import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './taskservice.controller';
import { TaskService } from './taskservice.service';
import { TaskEntity } from './taskservice.entity';
import { ClientController } from './client.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tasks',
      entities: [TaskEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController, ClientController],
  providers: [TaskService],
})
export class TaskModule {}

