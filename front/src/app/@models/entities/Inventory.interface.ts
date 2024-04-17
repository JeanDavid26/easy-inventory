import { BaseTable } from "./BaseTable.interface";
import { InventoryLine } from "./InventoryLine.interface";
import { InventoryMovement } from "./InventoryMovement.interface";
import { InventoryType } from "./InventoryType.interface";

export interface Inventory extends BaseTable {
  label?: string
  inventoryTypeId?: number
  oInventoryType?: InventoryType
  tDocument?: Document[]
  tInventoryLine?: InventoryLine[]
  tInventoryMovementSource?: InventoryMovement[]
  tInventoryMovementDestination?: InventoryMovement[]
  value?: number
  quantity?: number
}
