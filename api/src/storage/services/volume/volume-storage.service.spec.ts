import { Test, TestingModule } from '@nestjs/testing'
import { VolumeStorageService } from './volume-storage.service'

describe('VolumeService', () => {
  let service: VolumeStorageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ VolumeStorageService ]
    }).compile()

    service = module.get<VolumeStorageService>(VolumeStorageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
