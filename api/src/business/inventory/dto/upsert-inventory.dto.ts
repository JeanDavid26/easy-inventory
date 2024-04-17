import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpsertInventoryDto {
  @IsNotEmpty()
  label: string

  @IsNotEmpty()
  @IsNumber()
  inventoryTypeId: number
}
