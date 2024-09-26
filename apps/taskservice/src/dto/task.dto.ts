import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export enum TaskStatus {
    PENDING = 'pendiente',
    IN_PROGRESS = 'en progreso',
    COMPLETED = 'completada',
}

export class CreateTaskDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}