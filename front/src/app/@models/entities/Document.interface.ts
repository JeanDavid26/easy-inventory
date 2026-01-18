import { BaseTable } from "./BaseTable.interface";
import { Inventory } from "./Inventory.interface";
import { SaleSession } from "./SaleSession.interface";

export interface Document extends BaseTable {

  inventoryId : number | null
  saleSessionId : number | null
  fileName: string
  originalName: string
  mimetype: string
  size: number
  storagePath: string
  metadata: { label : string}
  oInventory: Inventory | null
  oSaleSession: SaleSession | null
}
