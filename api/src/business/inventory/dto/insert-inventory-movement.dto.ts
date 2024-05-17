import { IsDate, IsNotEmpty, IsNumber, IsOptional, Length, ValidateNested } from 'class-validator'
import { TransformNumber } from 'src/shared/decorator/transform.number.decorator'

export class InsertInventoryMovementDto {

  @IsNotEmpty()
  reference: string

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  movementTypeId: number

  @IsNotEmpty()
  @IsDate()
  dateTime: Date

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  sourceInventoryId: number

  @IsOptional()
  @TransformNumber()
  @IsNumber()
  destinationInventoryId: number

  @IsNotEmpty()
  @ValidateNested()
  @Length(1)
  movementLines : MovementLineDto[]
}

export class MovementLineDto {

  @IsNotEmpty()
  @IsNumber()
  articleId : number

  @IsNotEmpty()
  @IsNumber()
  quantity : number
}