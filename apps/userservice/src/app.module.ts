import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'nombre_base_datos',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AppEntity]), // Importa la entidad para usarla en el repositorio
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}