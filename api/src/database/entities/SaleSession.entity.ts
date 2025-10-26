import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import { BaseTable } from './BaseTable'
import { SaleStatus } from '../@models/sale-status.enum'
import { Sale } from './Sale.entity'

@Entity({ schema: 'easyinventory', name: 'salesession' })
export class SaleSession extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name : 'salesessionreference', nullable: true })
  saleSessionReference : string

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.ONGOING
  })
  status: string

  @Column('decimal', { nullable : true, precision: 5, scale: 2, transformer : {
    from: (value: string) => parseFloat(value),
    to: (value: number) => value
  } })
  changeFund: number
 
  @OneToMany(() => Sale, sale => sale.oSaleSession)
  tSale : Sale[]
}
