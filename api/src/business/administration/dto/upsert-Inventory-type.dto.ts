import { IsNotEmpty } from 'class-validator'

export class UpsertInventoryTypeDto {
  @IsNotEmpty()
  label : string
}