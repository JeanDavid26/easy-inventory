import { Column, Entity } from 'typeorm'
import { BaseTable } from './BaseTable'
import { SaleStatus } from '../@models/sale-status.enum'

@Entity({ schema: 'easyinventory', name: 'sale' })
export class Sale extends BaseTable {
  @Column()
  saleDate: Date

  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.ONGOING
  })
  status: string
}
