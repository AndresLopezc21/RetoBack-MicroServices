import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') 
export class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;
}