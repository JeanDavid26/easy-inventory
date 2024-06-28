import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Sale } from './Sale.entity'
import { BaseTable } from './BaseTable'
import { PaymentMethod } from './PaiementMethod.entity'

@Entity({ schema: 'easyinventory', name: 'payment' })
export class Payment extends BaseTable {
  
  @Column({ name : 'saleid' })
  saleId : number

  @Column()
  amount: number

  @Column({ name : 'paymentmethodid' })
  paymentMethodId: number

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.id)
  @JoinColumn({ name: 'paymentmethodid' })
  oPaymentMethod: PaymentMethod

  @ManyToOne(() => Sale, sale => sale.tPayments)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale
}
