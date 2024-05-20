import { BaseTable } from "./BaseTable.interface";
import { Inventory } from "./Inventory.interface";
import { MovementLine } from "./MovementLine.interface";
import { MovementType } from "./MovementType.interface";

export interface InventoryMovement extends BaseTable {
  reference?: string
  movementTypeId?: number
  oMovementType?: MovementType
  dateTime?: Date
  sourceInventoryId?: number
  destinationInventoryId?: number
  description?: string
  oSourceInventory?: Inventory
  oDestinationInventory?: Inventory
  tMovementLine? : MovementLine[]

}
