import { Test, TestingModule } from '@nestjs/testing'
import { UnpaidSaleManagerService } from './unpaid-sale-manager.service'

describe('UnpaidSaleManagerService', () => {
  let service: UnpaidSaleManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UnpaidSaleManagerService ]
    }).compile()

    service = module.get<UnpaidSaleManagerService>(UnpaidSaleManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
