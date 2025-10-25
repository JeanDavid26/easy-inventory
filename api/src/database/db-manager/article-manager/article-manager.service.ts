import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Article } from 'src/database/entities/Article.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class ArticleManagerService extends DatabaseManager<Article> {
  constructor (@InjectRepository(Article) private _repo: Repository<Article>) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Article> {
    const repo = this._getRepo(options)
    const article = await repo.findOne({
      where: {
        id
      },
      relations: [ 'oCategory', 'tInventoryLine' ],
      order: { creationDate: 'DESC' }
    })

    if (!article) {
      throw new NotFoundException()
    }
    return article
  }

  public async list ({ tRelation, bFilterStorable, options = {} }: { tRelation?: string[], bFilterStorable?: boolean, options?: DatabaseManagerOptions }): Promise<Article[]> {
    const repo = this._getRepo(options)
    let where: FindOptionsWhere<Article> = null
    if (bFilterStorable) {
      where = {
        isNotStorable: false
      }
    }
    return repo.find({
      where,
      relations: [ 'oCategory', ...tRelation ?? [] ]
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<Article>, options?: DatabaseManagerOptions }): Promise<Article> {
    const repo = this._getRepo(options)
    const reference = repo.create(data)
    return repo.save(reference)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Article>, options?: DatabaseManagerOptions }): Promise<Article> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    const article = repo.create(data)
    const articleSaved = await repo.save(article)
    return articleSaved
  }

  public async softDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Article> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.save({
      id,
      deleteDate: new Date()
    })
  }
}
