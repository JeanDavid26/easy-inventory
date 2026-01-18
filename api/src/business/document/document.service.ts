import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Readable } from 'stream'
import { IStorageService } from 'src/storage/models/storage-service.interface'
import { STORAGE_SERVICE } from 'src/storage/storage.module'
import { UploadDocumentDto } from './dto/upload-document.dto'
import { Document } from 'src/database/entities/Document.entity'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service'
import { Response } from 'express'
@Injectable()
export class DocumentService {
  constructor (
    @Inject(STORAGE_SERVICE) private _storageService : IStorageService,
    private _documentManagerService: DocumentManagerService
  ) {}

  async upload ({ file, body } : {file : Express.Multer.File, body : UploadDocumentDto}) : Promise<Document> {
    console.log(file.originalname)
    const uuid = uuidv4()
    const ext = path.extname(file.originalname) || ''
    const uniqueFileName = `${uuid}${ext}`

    const now = new Date()
    const yyyy = String(now.getFullYear())
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const relativePath = path.join('documents', yyyy, mm, dd, uniqueFileName)
    
    const documentData : Partial<Document> = {
      fileName : uniqueFileName,
      originalName : file.originalname,
      mimetype : file.mimetype,
      size: file.size,
      storagePath: relativePath,
      metadata: { label : body.label },
      inventoryId: body.inventoryId,
      saleSessionId: body.saleSessionId
    }
    
    await this._storageService.upload({ buffer: file.buffer, relativePath })

    const oDocument = await this._documentManagerService.insert({ data :documentData }).catch(async (err)=> {
      await this._storageService.delete({ relativePath })
      throw err
    })

    return oDocument
  }

  async download ({ id }: { id: number }) : Promise<{ stream: Readable; fileName: string; originalName: string; mimetype: string; size: number }> {
    // load document metadata from DB
    const document = await this._documentManagerService.get({ id })

    if (!document || !document.storagePath) {
      throw new NotFoundException('Document not found')
    }

    try {
      const buffer = await this._storageService.download({ relativePath: document.storagePath })
      const stream = Readable.from(buffer)
      return {
        stream,
        fileName: document.fileName,
        originalName: document.originalName,
        mimetype: document.mimetype,
        size: document.size
      }
    } catch (err) {
      // storage layer may throw generic errors; map to NotFound for consistency
      throw new NotFoundException('File not found in storage')
    }
  }
 
}
