import { BaseTable } from "./BaseTable.interface";
import { Payment } from "./Payment.interface";
import { SaleLine } from "./SaleLine.interface";
import { SaleSession } from "./SaleSession.interface";

export interface Sale extends BaseTable {
  saleSessionId?: number
  totalAmount?: number
  oSaleSession?: SaleSession
  tSaleLine?: SaleLine[]
  tPayments?: Payment[]
}
