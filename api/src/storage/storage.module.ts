import { Module } from '@nestjs/common'
import { VolumeStorageService } from './services/volume/volume-storage.service'
import { S3StorageService } from './services/s3/s3.service'
import { storageConfig } from './config/storage.config'

export const STORAGE_SERVICE = 'STORAGE_SERVICE' // Token d'injection
@Module({
  providers: [
    {
      provide: STORAGE_SERVICE,
      useFactory: () => {
        if (storageConfig.method === 's3') {
          return new S3StorageService()
        }
        return new VolumeStorageService(storageConfig)
      }
    }
  ],
  exports: [ STORAGE_SERVICE ]
})
export class StorageModule {}
