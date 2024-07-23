import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Category } from './Category.entity'
import { InventoryLine } from './InventoryLine.entity'

@Entity({ schema: 'easyinventory', name: 'article' })
export class Article extends BaseTable {
  @Column()
  label: string

  @Column({ name: 'referencecode' })
  referenceCode: string

  @Column({ name: 'barcode', nullable: true })
  barCode: string

  @Column({ name: 'unitprice', type: 'double precision' })
  unitPrice: number

  @Column({ name: 'categoryid' })
  categoryId: number

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryid' })
  oCategory: Category

  @OneToMany(() => InventoryLine, (inventoryLine) => inventoryLine.oArticle)
  tInventoryLine: InventoryLine[]
}
