import { BaseTable } from "./BaseTable.interface";
import { Sale } from "./Sale.interface";

export interface SaleLine extends BaseTable {
  saleId: number
  oSale: Sale
  quantity: number
  salePrice: number
}
