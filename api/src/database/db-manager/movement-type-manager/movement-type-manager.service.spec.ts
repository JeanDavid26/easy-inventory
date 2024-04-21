import { Test, TestingModule } from '@nestjs/testing'
import { MovementTypeManagerService } from './movement-type-manager.service'

describe('MovementTypeManagerService', () => {
  let service: MovementTypeManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ MovementTypeManagerService ]
    }).compile()

    service = module.get<MovementTypeManagerService>(MovementTypeManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
