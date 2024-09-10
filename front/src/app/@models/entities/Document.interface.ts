import { AppFile } from "./AppFile.interface";
import { BaseTable } from "./BaseTable.interface";
import { Inventory } from "./Inventory.interface";

export interface Document extends BaseTable {

  label?: string
  appFileId?: number
  inventoryId?: number
  oAppFile?: AppFile
  oInventory?: Inventory
}
