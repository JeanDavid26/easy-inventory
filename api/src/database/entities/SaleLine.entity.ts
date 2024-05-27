import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Sale } from './Sale.entity'
import { Article } from './Article.entity'
import { PaiementMethod } from './PaiementMethod.entity'

@Entity({ schema: 'easyinventory', name: 'saleline' })
export class SaleLine extends BaseTable {
  @Column({ name: 'saleid' })
  saleId: number

  @Column({ name : 'articleid' })
  articleId : number
  
  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2, name: 'saleprice' })
  salePrice: number

  @Column({ name : 'paiementmethodid' })
  paiementMethodId: number

  @ManyToOne(()=> PaiementMethod, (paiementMethod) => paiementMethod.id)
  @JoinColumn({ name : 'paiementmethodid' })
  oPaiementMethod : PaiementMethod

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'articleid' })
  oArticle : Article

  @ManyToOne(() => Sale, (sale) => sale.id)
  @JoinColumn({ name: 'saleid' })
  oSale: Sale
}
