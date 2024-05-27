import { Test, TestingModule } from '@nestjs/testing'
import { PaiementMethodManagerService } from './paiement-method-manager.service'

describe('PaiementMethodManagerService', () => {
  let service: PaiementMethodManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ PaiementMethodManagerService ]
    }).compile()

    service = module.get<PaiementMethodManagerService>(PaiementMethodManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
