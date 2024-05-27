import { Test, TestingModule } from '@nestjs/testing'
import { SaleLineManagerService } from './sale-line-manager.service'

describe('SaleLineManagerService', () => {
  let service: SaleLineManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ SaleLineManagerService ]
    }).compile()

    service = module.get<SaleLineManagerService>(SaleLineManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
