import { BaseTable } from "./BaseTable.interface"
import { Sale } from "./Sale.interface"

export interface SaleSession extends BaseTable {
  saleSessionReference?: string
  status?: string
  changeFund?: number;
  tSale?: Sale[]
}
