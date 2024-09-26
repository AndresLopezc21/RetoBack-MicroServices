import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';
import { ClientController } from './client.controller';
import { TaskModule } from 'apps/taskservice/src/taskservice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: '', 
      database: 'users',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AppEntity]),
  ],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
