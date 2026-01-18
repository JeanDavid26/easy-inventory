import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { SharedModule } from 'src/shared/shared.module'
import { MulterModule } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { StorageModule } from 'src/storage/storage.module'
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service'
import { DocumentGenerationService } from './document-generation.service'

@Module({
  controllers: [ DocumentController ],
  providers: [ DocumentService, PdfGeneratorService, DocumentGenerationService ],
  imports: [ SharedModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 10485760 }
    }),
    StorageModule
  ]
})
export class DocumentModule {}
