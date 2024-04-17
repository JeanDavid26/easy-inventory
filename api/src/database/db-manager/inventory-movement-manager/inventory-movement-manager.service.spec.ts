import { Test, TestingModule } from '@nestjs/testing';
import { InventoryMovementManagerService } from './inventory-movement-manager.service';

describe('InventoryMovementManagerService', () => {
  let service: InventoryMovementManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryMovementManagerService],
    }).compile();

    service = module.get<InventoryMovementManagerService>(InventoryMovementManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
