import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { DocumentService } from './document.service'
import { Document } from 'src/database/entities/Document.entity'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadDocumentDto } from './dto/upload-document.dto'

@Controller('document')
export class DocumentController {
  constructor (private _documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public uploadDocument (
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDocumentDto,
  ): Promise<Document> {
    return this._documentService.uploadDocument(file, body)
  }

  @Get('inventory/:inventoryId')
  public getDocumentsByInventoryId (
    @Param('inventoryId') inventoryId: string,
  ): Promise<Document[]> {
    return this._documentService.getDocumentsByInventoryId(inventoryId)
  }

  @Get('content/:documentId')
  public getContentFromDocument (
    @Param('documentId') documentId: number,
  ): Promise<Buffer> {
    return this._documentService.getContentFromDocument(documentId)
  }
}
