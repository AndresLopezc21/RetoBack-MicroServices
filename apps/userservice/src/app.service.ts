import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(AppEntity)
        private userRepository: Repository<AppEntity>,
    ) {}

    async createUser(nombre: string, email: string): Promise<AppEntity> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
          throw new ConflictException('El correo electrónico ya está en uso');
        }
        const newUser = this.userRepository.create({ nombre, email });
        return await this.userRepository.save(newUser);
      }

      async findAll(page: number, limit: number): Promise<AppEntity[]> {
        const [results, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return results;
    }

    async findOne(id: number): Promise<AppEntity | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('El usuario con ID correspondiente no existe');
        }

        return user;
    }
    
    async updateUser(id: number, updateData: UpdateUserDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('El usuario con ID correspondiente no existe');
    }

    const existingUser = await this.userRepository.findOne({ where: { email: updateData.email } });
    if (existingUser && existingUser.id !== id) {
      throw new ConflictException('El correo electrónico ya está en uso por otro usuario');
    }

    user.nombre = updateData.nombre;
    user.email = updateData.email;

    await this.userRepository.save(user);
    return { message: 'Usuario actualizado correctamente' };
  }

    async deleteUserById(id: number): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('El usuario con ID correspondiente no existe');
        }

        await this.userRepository.delete(id);
        return { message: "Usuario eliminado correctamente" };
    }
}