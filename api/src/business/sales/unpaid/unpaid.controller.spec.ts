import { Test, TestingModule } from '@nestjs/testing'
import { UnpaidController } from './unpaid.controller'

describe('UnpaidController', () => {
  let controller: UnpaidController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ UnpaidController ]
    }).compile()

    controller = module.get<UnpaidController>(UnpaidController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
