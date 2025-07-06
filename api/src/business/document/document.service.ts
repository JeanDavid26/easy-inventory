import { Injectable } from '@nestjs/common'
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service'
import { Document } from 'src/database/entities/Document.entity'
import { UploadDocumentDto } from './dto/upload-document.dto'
import { FileService } from 'src/shared/services/file/file.service'
import { Response } from 'express'
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service'
@Injectable()
export class DocumentService {
  constructor (
    private _documentManagerService: DocumentManagerService,
    private _fileService: FileService,
    private _inventoryManagerService : InventoryManagerService
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

  public async getContentFromDocument (documentId: number, res : Response): Promise<Buffer> {
    const document = await this._documentManagerService.get(documentId)
    const buffer = await this._fileService.getBufferFromPath(document.oAppFile.path)
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
    res.setHeader('Content-Disposition', `filename=Visuel Document`)
    res.setHeader('Content-Type', document.oAppFile.contentType)

    res.send(buffer)

    return buffer
  }

  public async getInventoryContentReport (id : number) : Promise<Buffer> {

    const oInventory = await this._inventoryManagerService.get(id)

    return null
  }

}
