import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sale } from './Sale.entity'

@Entity({ schema: 'easyinventory', name: 'donline' })
export class DonLine {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'saleid' })
  saleId: number

  @Column({ length: 255, default: 'Don' })
  label: string

  @Column('decimal', { precision: 10, scale: 2, transformer: {
    from: (value: string) => parseFloat(value),
    to: (value: number) => value
  } })
  amount: number

  @CreateDateColumn({ name: 'creationdate' })
  creationDate: Date

  @DeleteDateColumn({ name: 'deletedate' })
  deleteDate: Date

  @ManyToOne(() => Sale, (sale) => sale.tDonLine)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale
}
