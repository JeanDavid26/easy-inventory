import { BaseTable } from "./BaseTable.interface"
import { Sale } from "./Sale.interface"

export interface SaleSession extends BaseTable {
  status?: string
  tSale?: Sale[]
}
