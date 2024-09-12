import { Column, Entity, OneToMany } from 'typeorm'
import { BaseTable } from './BaseTable'
import { Article } from './Article.entity'

@Entity({ schema: 'easyinventory', name: 'category' })
export class Category extends BaseTable {
  @Column()
  label: string

  @Column({ nullable : true })
  code: string

  @OneToMany(() => Article, (article) => article.oCategory)
  tArticle: Article[]
}
