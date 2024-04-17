import { Column, Entity } from 'typeorm'
import { BaseTable } from './BaseTable'

@Entity({ schema: 'easyinventory', name: 'sale' })
export class Sale extends BaseTable {
  @Column()
  saleDate: Date

  @Column()
  status: string
}
