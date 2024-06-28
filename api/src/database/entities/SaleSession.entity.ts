import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import { BaseTable } from './BaseTable'
import { SaleStatus } from '../@models/sale-status.enum'
import { Sale } from './Sale.entity'

@Entity({ schema: 'easyinventory', name: 'salesession' })
export class SaleSession extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.ONGOING
  })
  status: string
 
  @OneToMany(() => Sale, sale => sale.oSaleSession)
  tSale : Sale[]
}
