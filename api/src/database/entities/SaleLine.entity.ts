import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Sale } from './Sale.entity'

@Entity({ schema: 'easyinventory', name: 'saleline' })
export class SaleLine extends BaseTable {
  @Column({ name: 'saleid' })
  saleId: number

  @ManyToOne(() => Sale, (sale) => sale.id)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2, name: 'saleprice' })
  salePrice: number
}
