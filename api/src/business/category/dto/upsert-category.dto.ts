import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpsertCategoryDto {
  @IsNotEmpty()
  label: string

  @IsOptional()
  code : string
}
