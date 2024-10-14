import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { SaleSession } from './SaleSession.entity'
import { Payment } from './Payment.entity'
import { SaleLine } from './SaleLine.entity'
import { BaseTable } from './BaseTable'
import { UnpaidSale } from './UnpaidSale.entity'

@Entity({ schema: 'easyinventory', name: 'sale' })
export class Sale extends BaseTable {

  @Column({ name : 'salesessionid' })
  saleSessionId: number

  @Column({ type : 'double precision', name  : 'totalamount' })
  totalAmount: number

  @ManyToOne(() => SaleSession, saleSession => saleSession.tSale)
  @JoinColumn({ name: 'salesessionid' })
  oSaleSession: SaleSession

  @OneToMany(()=> SaleLine, saleLine => saleLine.oSale)
  tSaleLine : SaleLine[]

  @OneToMany(() => UnpaidSale, unpaidSale => unpaidSale.oSaleRepayment)
  tUnpaidSaleRepayment : UnpaidSale[]

  @OneToMany(() => Payment, payment => payment.oSale)
  tPayment: Payment[]
}
