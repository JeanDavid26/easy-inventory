import { BaseTable } from "./BaseTable.interface";

export interface Sale extends BaseTable {
  saleDate: Date
  status: string
}
