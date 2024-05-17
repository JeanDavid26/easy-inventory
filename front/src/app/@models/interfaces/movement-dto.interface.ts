import { MovementLineDto } from "./movement-line-dto.interface"

export interface MovementDto {
  reference: string
  movementTypeId: number
  dateTime: Date
  sourceInventoryId: number
  destinationInventoryId: number
  movementLines : MovementLineDto
}
