import { IsNotEmpty, IsEnum, IsNumber, IsInt, IsOptional, IsPositive, Min } from 'class-validator';

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
    @IsNotEmpty({ message: 'El userId no puede estar vacío' })
    @IsInt({ message: 'El userId debe ser un número entero' })
    userId: number;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsNotEmpty({ message: 'El título no puede estar vacío' })
    title?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus, { message: 'El estado debe ser uno de los valores válidos: pendiente, en progreso, completada' })
    status?: TaskStatus;
}
export class TaskIdDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id: number;
}