import { Type } from 'class-transformer'
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, Length, ValidateNested } from 'class-validator'
import { TransformDate } from 'src/shared/decorator/transform-date.decorator'
import { TransformNumber } from 'src/shared/decorator/transform.number.decorator'

export class InsertInventoryMovementDto {

  @IsNotEmpty()
  reference: string

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  movementTypeId: number

  @IsNotEmpty()
  @TransformDate()
  @IsDate()
  dateTime: Date

  @IsOptional()
  @TransformNumber()
  @IsNumber()
  sourceInventoryId: number

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  destinationInventoryId: number

  @IsNotEmpty()
  @ValidateNested({ each: true }) // Apply validation to each item in the array
  @Type(() => MovementLineDto) // Transform each object in the array to MovementLineDto
  @IsArray()
  movementLines : MovementLineDto[]
}

export class MovementLineDto {

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  articleId : number

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  quantity : number
}