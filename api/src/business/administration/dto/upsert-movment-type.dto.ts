import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

export class UpsertMovmentTypeDto {
  @IsNotEmpty()
  label : string

  @IsOptional()
  @IsBoolean()
  isInternal : boolean
}