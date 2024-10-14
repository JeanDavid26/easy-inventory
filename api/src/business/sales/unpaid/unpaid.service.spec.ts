import { Test, TestingModule } from '@nestjs/testing'
import { UnpaidService } from './unpaid.service'

describe('UnpaidService', () => {
  let service: UnpaidService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UnpaidService ]
    }).compile()

    service = module.get<UnpaidService>(UnpaidService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
