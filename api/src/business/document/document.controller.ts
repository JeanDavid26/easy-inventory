import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { DocumentService } from './document.service'
import { Document } from 'src/database/entities/Document.entity'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadDocumentDto } from './dto/upload-document.dto'
import { Response } from 'express'
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service'

@Controller('document')
export class DocumentController {
  constructor (private _documentService: DocumentService, private _documentManagerService : DocumentManagerService) {}

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
    @Res() res : Response
  ): Promise<Buffer> {
    return this._documentService.getContentFromDocument(documentId, res)
  }

  @Get('inventory/:id/content-report')
  public getInventoryContentReport (@Param('id') id:number) : Promise<Buffer> {
    return this._documentService.getInventoryContentReport(id)
  }

  @Delete(':id')
  public deleteDocument (@Param('id') id : number) : Promise<Document> {
    return this._documentManagerService.softDelete(Number(id))
  }
}
