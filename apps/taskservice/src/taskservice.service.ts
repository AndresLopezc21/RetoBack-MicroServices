import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
