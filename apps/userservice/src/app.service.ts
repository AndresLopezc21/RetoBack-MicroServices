import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
import { EmailAlreadyExistsException } from './exceptions/email-already-exists.exception';

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
    return await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<AppEntity| null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
        throw new NotFoundException('El usuario con ID correspondiente no existe');
    }

    return user;
}

async updateUser(id: number, nombre: string, email: string): Promise<{message: string}> {
  const user = await this.userRepository.findOne({ where: { id } });

  if (!user) {
      throw new NotFoundException('El usuario con ID correspondiente no existe');
  }

  // Verifica si el email ya está en uso
  const existingUser = await this.userRepository.findOne({ where: { email } });
  if (existingUser && existingUser.id !== id) {
      throw new EmailAlreadyExistsException();
  }

  user.nombre = nombre;
  user.email = email;

   await this.userRepository.save(user);
  return {message:"Usuario actualizado correcta"};
}

  async deleteUserById(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
        throw new NotFoundException('El usuario con ID correspondiente no existe');
    }

    await this.userRepository.delete(id);
    return {message:"Usuario eliminado correctamente"};
}
}