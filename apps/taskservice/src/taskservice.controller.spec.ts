import { Test, TestingModule } from '@nestjs/testing';
import { TaskserviceController } from './taskservice.controller';
import { TaskserviceService } from './taskservice.service';

describe('TaskserviceController', () => {
  let taskserviceController: TaskserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskserviceController],
      providers: [TaskserviceService],
    }).compile();

    taskserviceController = app.get<TaskserviceController>(TaskserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(taskserviceController.getHello()).toBe('Hello World!');
    });
  });
});
