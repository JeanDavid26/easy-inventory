import { Injectable } from '@nestjs/common'
import { IStorageService } from 'src/storage/models/storage-service.interface'

@Injectable()
export class S3StorageService implements IStorageService {
  delete ({ relativePath }: { relativePath: string; }): Promise<void> {
    console.log(relativePath)
    throw new Error('Method not implemented.')
  }
  upload ({ buffer, relativePath }: { buffer: any; relativePath: any; }): Promise<void> {
    console.log(buffer)
    console.log(relativePath)
    throw new Error('Method not implemented.')
  }
  download ({ relativePath }: { relativePath: any; }): Promise<Buffer> {
    console.log(relativePath)
    throw new Error('Method not implemented.')
  }

}
