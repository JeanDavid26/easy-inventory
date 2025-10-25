import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Category } from 'src/database/entities/Category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryManagerService extends DatabaseManager<Category> {
  constructor (
    @InjectRepository(Category) private _repo: Repository<Category>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Category> {
    const repo = this._getRepo(options)
    const category = await repo.findOne({
      where: {
        id
      },
      relations: [ 'tArticle' ]
    })

    if (!category) {
      throw new BadRequestException('Article not found')
    }
    return category
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<Category[]> {
    const repo = this._getRepo(options)
    return repo.find({
      relations: [ 'tArticle' ],
      order: {
        label: 'ASC'
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<Category>, options?: DatabaseManagerOptions }): Promise<Category> {
    const repo = this._getRepo(options)
    const reference = repo.create(data)
    return repo.save(reference)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Category>, options?: DatabaseManagerOptions }): Promise<Category> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async softDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Category> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.save({
      id,
      deleteDate: new Date()
    })
  }
}
