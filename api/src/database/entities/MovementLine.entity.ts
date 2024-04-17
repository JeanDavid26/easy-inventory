import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { InventoryMovement } from './InventoryMovement.entity'
import { Article } from './Article.entity'

@Entity({ schema: 'easyinventory', name: 'movementline' })
export class MovementLine extends BaseTable {
  @Column({ name: 'movementid' })
  movementId: number

  @Column({ name: 'articleid' })
  articleId: number

  @Column()
  quantity: number

  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.id,
  )
  @JoinColumn({ name: 'movementid' })
  oInventoryMovement: InventoryMovement

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'articleid' })
  oArticle: Article
}
