import { Test, TestingModule } from '@nestjs/testing'
import { PaymentManagerService } from './payment-manager.service'

describe('PaymentManagerService', () => {
  let service: PaymentManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ PaymentManagerService ]
    }).compile()

    service = module.get<PaymentManagerService>(PaymentManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
