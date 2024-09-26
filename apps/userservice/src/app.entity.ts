import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Userservice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;
}