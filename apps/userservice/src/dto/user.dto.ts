import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    nombre: string;
  
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;
  }
  
  export class UpdateUserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    nombre: string;
  
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;
  }

export class UserIdDto {
    @IsNotEmpty()
    @IsInt()
    id: number;
}