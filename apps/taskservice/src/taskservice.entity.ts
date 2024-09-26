import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export enum TaskStatus {
  PENDING = 'pendiente',
  IN_PROGRESS = 'en progreso',
  COMPLETED = 'completada',
}

@Entity('tasks') 
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; 

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
      type: 'enum',
      enum: TaskStatus,
      default: TaskStatus.PENDING, 
  })
  status: TaskStatus;
}
