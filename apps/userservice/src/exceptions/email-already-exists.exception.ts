import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExistsException extends ConflictException {
    constructor() {
        super('El correo ya está en uso por otro usuario');
    }
}