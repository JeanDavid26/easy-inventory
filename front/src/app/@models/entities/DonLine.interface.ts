import { BaseTable } from './BaseTable.interface'

export interface DonLine extends BaseTable {
  saleId?: number
  label?: string
  amount?: number
}
