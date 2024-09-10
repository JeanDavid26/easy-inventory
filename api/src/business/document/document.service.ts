import { Injectable } from '@nestjs/common'
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service'
import { Document } from 'src/database/entities/Document.entity'
import { UploadDocumentDto } from './dto/upload-document.dto'
import { FileService } from 'src/shared/services/file/file.service'

@Injectable()
export class DocumentService {
  constructor (
    private _documentManagerService: DocumentManagerService,
    private _fileService: FileService,
  ) {}

  public async uploadDocument (
    file: Express.Multer.File,
    body: UploadDocumentDto,
  ): Promise<Document> {
    const appFile = await this._fileService.addAppFile(file)
    const documentPartial: Partial<Document> = {
      appFileId: appFile.id,
      inventoryId: body.inventoryId,
      label: body.label
    }
    return this._documentManagerService.insert(documentPartial)
  }

  public async getDocumentsByInventoryId (
    inventoryId: string,
  ): Promise<Document[]> {
    return this._documentManagerService.findByInventoryId(inventoryId)
  }

  public async getContentFromDocument (documentId: number): Promise<Buffer> {
    const document = await this._documentManagerService.get(documentId)
    return this._fileService.getBufferFromPath(document.oAppFile.path)
  }
}
