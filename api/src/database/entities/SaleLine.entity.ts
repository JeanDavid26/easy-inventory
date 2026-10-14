import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Sale } from './Sale.entity'
import { Article } from './Article.entity'
import { Inventory } from './Inventory.entity'
@Entity({ schema: 'easyinventory', name: 'saleline' })
export class SaleLine extends BaseTable {
  @Column({ name: 'saleid' })
  saleId: number

  @Column({ name : 'articleid' })
  articleId : number
  
  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2, name: 'saleprice', transformer : {
    from: (value: string) => parseFloat(value),
    to: (value: number) => value
  } })
  salePrice: number

  @Column('decimal', { precision: 5, scale: 2, default: 0, transformer : {
    from: (value: string) => parseFloat(value),
    to: (value: number) => value
  } })
  discount: number 

  // Stock dans lequel l'article a été (ou sera, tant que la session est ouverte) débité
  @Column({ name: 'inventoryid', nullable: true })
  inventoryId: number

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventoryid' })
  oInventory: Inventory

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'articleid' })
  oArticle : Article

  @ManyToOne(() => Sale, (sale) => sale.id)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale
}
