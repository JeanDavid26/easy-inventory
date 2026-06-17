import { BaseTable } from "./BaseTable.interface";
import { DonLine } from "./DonLine.interface";
import { Payment } from "./Payment.interface";
import { SaleLine } from "./SaleLine.interface";
import { SaleSession } from "./SaleSession.interface";
import { UnpaidSale } from "./UnpaidSale.interface";

export interface Sale extends BaseTable {
  saleSessionId?: number
  totalAmount?: number
  oSaleSession?: SaleSession
  tSaleLine?: SaleLine[]
  tDonLine?: DonLine[]
  tPayment?: Payment[]
  displayTableRef? : string
  displayTableRefLabel? : string
  displayTablePayment? : string
  tSaleRepayment? : UnpaidSale[]
}
