import { IsNotEmpty, IsNumber } from 'class-validator'
import { TransformNumber } from 'src/shared/decorator/transform.number.decorator'

export class UpsertInventoryDto {
  @IsNotEmpty()
  label: string

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  inventoryTypeId: number
}
