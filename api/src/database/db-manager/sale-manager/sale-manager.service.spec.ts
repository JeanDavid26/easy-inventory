import { Test, TestingModule } from '@nestjs/testing';
import { SaleManagerService } from './sale-manager.service';

describe('SaleManagerService', () => {
  let service: SaleManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleManagerService],
    }).compile();

    service = module.get<SaleManagerService>(SaleManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
