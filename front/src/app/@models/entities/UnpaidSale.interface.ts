import { BaseTable } from "./BaseTable.interface";
import { Sale } from "./Sale.interface";

export interface  UnpaidSale extends BaseTable{
  saleId? : number
  isPaid? : boolean
  saleIdRepayment? : number
  oSale? : Sale
  oSaleRepayment? : Sale
}
