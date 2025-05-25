import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from 'src/database/entities/Article.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class ArticleManagerService {
  constructor (@InjectRepository(Article) private _repo: Repository<Article>) {}

  public async get (id: number): Promise<Article> {
    const article = await this._repo.findOne({
      where: {
        id
      },
      relations: [ 'oCategory', 'tInventoryLine' ],
      order : { creationDate : 'DESC' }
    })

    if (!article) {
      throw new NotFoundException()
    }
    return article
  }

  public async list (tRelation?: string[], bFilterStorable? : boolean): Promise<Article[]> {
    
    let where : FindOptionsWhere<Article> = null
    if (bFilterStorable) {
      where = {
        isNotStorable : false
      }
    }
    return this._repo.find({
      where,
      relations: [ 'oCategory', ... tRelation ?? [] ]
    })
  }

  public async insert (data: Partial<Article>): Promise<Article> {
    const reference = this._repo.create(data)
    return this._repo.save(reference)
  }

  public async update (id: number, data: Partial<Article>): Promise<Article> {
    delete data.id
    data.id = id
    const article = this._repo.create(data)
    const articleSaved = await this._repo.save(article)
    return articleSaved
  }

  public async softDelete (id: number): Promise<Article> {
    await this.get(id)
    return this._repo.save({
      id,
      deleteDate: new Date()
    })
  }
}
