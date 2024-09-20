import { Test, TestingModule } from '@nestjs/testing'
import { InventoryLineController } from './inventory-line.controller'

describe('InventoryLineController', () => {
  let controller: InventoryLineController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ InventoryLineController ]
    }).compile()

    controller = module.get<InventoryLineController>(InventoryLineController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
