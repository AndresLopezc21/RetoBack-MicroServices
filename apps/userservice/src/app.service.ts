import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private userRepository: Repository<AppEntity>,
  ) {}

  createUser(nombre: string, email: string): Promise<AppEntity> {
    const newUser = this.userRepository.create({ nombre, email });
    return this.userRepository.save(newUser);
  }

  findAll(page: number, limit: number): Promise<AppEntity[]> {
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number): Promise<AppEntity> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, nombre: string, email: string): Promise<void> {
    return this.userRepository.update(id, { nombre, email }).then(() => {});
  }

  deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}