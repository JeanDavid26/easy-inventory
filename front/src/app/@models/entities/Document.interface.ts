import { AppFile } from "./AppFile.interface";
import { Inventory } from "./Inventory.interface";

export interface Document {
  label?: string
  appFileId?: number
  inventoryId?: number
  oAppFile?: AppFile
  oInventory?: Inventory
}
