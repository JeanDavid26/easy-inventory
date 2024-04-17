import { Test, TestingModule } from '@nestjs/testing'
import { InventoryLineManagerService } from './inventory-line-manager.service'

describe('InventoryLineManagerService', () => {
  let service: InventoryLineManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ InventoryLineManagerService ]
    }).compile()

    service = module.get<InventoryLineManagerService>(
      InventoryLineManagerService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
