import { IsNotEmpty, IsOptional } from 'class-validator'

export class UploadDocumentDto {
  @IsNotEmpty()
  label: string

  @IsOptional()
  inventoryId?: number | null

  @IsOptional()
  saleSessionId?: number | null
}
