import { IsOptional } from 'class-validator'

export class UpdateSaleSessionDto {
  
  @IsOptional()
  saleSessionReference : string

  @IsOptional()
  creationDate : Date

  @IsOptional()
  changeFund: number
} 