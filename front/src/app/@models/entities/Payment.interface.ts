import { BaseTable } from "./BaseTable.interface";
import { PaymentMethod } from "./PaymentMethod.interface";
import { Sale } from "./Sale.interface";

export interface Payment extends BaseTable {
  saleId?: number
  amount?: number
  paymentMethodId?: number
  oPaymentMethod?: PaymentMethod
  oSale?: Sale
}
