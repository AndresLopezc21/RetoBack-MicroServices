import { IsNotEmpty, IsEnum, IsNumber, IsInt, IsOptional, IsPositive } from 'class-validator';

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

export class GetTasksByUserDto {

    @IsNotEmpty()
    userId: number;


    @IsOptional()
    page?: number;


    @IsOptional()
    limit?: number;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}

export class TaskIdDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id: number;
}