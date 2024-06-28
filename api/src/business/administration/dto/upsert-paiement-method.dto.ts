import { IsNotEmpty } from 'class-validator'

export class UpsertPaiementMethodDto {
  @IsNotEmpty()
  label : string
}