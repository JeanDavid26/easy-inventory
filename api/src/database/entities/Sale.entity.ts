import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { SaleSession } from './SaleSession.entity'
import { Payment } from './Payment.entity'
import { SaleLine } from './SaleLine.entity'
import { BaseTable } from './BaseTable'

@Entity({ schema: 'easyinventory', name: 'sale' })
export class Sale extends BaseTable {

  @Column({ name : 'salesessionid' })
  saleSessionId: number

  @Column()
  totalAmount: number

  @ManyToOne(() => SaleSession, saleSession => saleSession.tSale)
  @JoinColumn({ name: 'saleSessionId' })
  oSaleSession: SaleSession

  @OneToMany(()=> SaleLine, saleLine => saleLine.saleId)
  tSaleLine : SaleLine[]

  @OneToMany(() => Payment, payment => payment.oSale)
  tPayments: Payment[]
}
