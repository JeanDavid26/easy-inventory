import { Test, TestingModule } from '@nestjs/testing';
import { MovementLineManagerService } from './movement-line-manager.service';

describe('MovementLineManagerService', () => {
  let service: MovementLineManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementLineManagerService],
    }).compile();

    service = module.get<MovementLineManagerService>(MovementLineManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
