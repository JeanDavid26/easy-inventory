import { Test, TestingModule } from '@nestjs/testing'
import { SaleSessionManagerService } from './sale-session-manager.service'

describe('SaleSessionManagerService', () => {
  let service: SaleSessionManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ SaleSessionManagerService ]
    }).compile()

    service = module.get<SaleSessionManagerService>(SaleSessionManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
