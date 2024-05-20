import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Article } from './Article.entity'
import { Inventory } from './Inventory.entity'

@Entity({ schema: 'easyinventory', name: 'invenotryline' })
export class InventoryLine extends BaseTable {
  @Column({ name: 'articleId' })
  articleId: number

  @Column({ name: 'inventoryid' })
  inventoryId: number

  @Column()
  quantity: number

  @Column({ name: 'updatedate' })
  updateDate: Date

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'articleId' })
  oArticle: Article

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  @JoinColumn({ name: 'inventoryid' })
  oInventory: Inventory
}
