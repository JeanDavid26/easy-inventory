import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Sale } from './Sale.entity'

@Entity({ schema: 'easyinventory', name: 'unpaidsale' })
export class UnpaidSale extends BaseTable {
  
  @Column({ name : 'saleid' })
  saleId : number

  @Column({ name : 'saleidrepayment', nullable : true })
  saleIdRepayment : number

  @Column({ name : 'ispaid', default : false })
  isPaid : boolean

  @ManyToOne(() => Sale, sale => sale.id)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale

  @ManyToOne(() => Sale, sale => sale.tUnpaidSaleRepayment)
  @JoinColumn({ name: 'saleidrepayment' })
  oSaleRepayment: Sale
}