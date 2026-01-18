import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res
} from '@nestjs/common'
import { DocumentService } from './document.service'
import { Document } from 'src/database/entities/Document.entity'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadDocumentDto } from './dto/upload-document.dto'
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service'
import { Response } from 'express'
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service'
import { DocumentGenerationService } from './document-generation.service'

@Controller('document')
export class DocumentController {
  constructor (
    private _documentService: DocumentService,
    private _documentManagerService : DocumentManagerService,
    private _documentGenerationService : DocumentGenerationService,
    private _pdfGeneratorService : PdfGeneratorService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public uploadDocument (
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDocumentDto,
  ): Promise<Document> {
    return this._documentService.upload({ file, body })
  }

  @Get('inventory/:inventoryId')
  async listInventoryDocument (@Param('inventoryId') inventoryId : string) : Promise<Document[]> {
    return this._documentManagerService.listInventoryDocument({ inventoryId : Number(inventoryId) })
  }

  @Get('download/:id')
  async download (@Param('id') id : string, @Res() res: Response) : Promise<any> {
    const { stream, originalName, mimetype, size } = await this._documentService.download({ id: Number(id) })

    res.setHeader('Content-Type', mimetype)
    if (size) {
      res.setHeader('Content-Length', String(size))
    }
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`)

    stream.pipe(res)
    return null
  }

  @Get('sale-resume/:idSaleSession')
  async generateSaleResume (@Param('idSaleSession') idSaleSession: string, @Res() res: Response) :Promise<any> {
    return this._documentGenerationService.generateSaleSessionReport(Number(idSaleSession), res)
  }
}
