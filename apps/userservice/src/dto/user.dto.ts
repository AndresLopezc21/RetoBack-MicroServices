import { IsEmail, IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    nombre: string;
  
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;
  }
  
  export class UpdateUserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    nombre: string;
    
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;
  }

  export class UserIdDto {
    @IsNotEmpty({ message: 'El id no puede estar vacio' })
    @IsInt({ message: 'El id debe ser un número entero' })
    id: number;
}