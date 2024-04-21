import { Test, TestingModule } from '@nestjs/testing'
import { InventoryTypeManagerService } from './inventory-type-manager.service'

describe('InventoryTypeManagerService', () => {
  let service: InventoryTypeManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ InventoryTypeManagerService ]
    }).compile()

    service = module.get<InventoryTypeManagerService>(InventoryTypeManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
