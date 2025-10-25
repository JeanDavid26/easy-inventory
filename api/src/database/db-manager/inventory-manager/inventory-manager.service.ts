import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Inventory } from 'src/database/entities/Inventory.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryManagerService extends DatabaseManager<Inventory> {
  constructor (
    @InjectRepository(Inventory) private _repo: Repository<Inventory>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Inventory> {
    const repo = this._getRepo(options)
    const qb = repo
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.tInventoryLine', 'tinventoryline')
      .leftJoinAndSelect('tinventoryline.oArticle', 'tinventoryline_oarticle')
      .leftJoinAndSelect('tinventoryline_oarticle.oCategory', 'tinventoryline_oarticle_category')
      .where('inventory.id = :id', { id })

    return qb.getOne()
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<Inventory[]> {
    const repo = this._getRepo(options)
    const qb = repo
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.tInventoryLine', 'tinventoryline')
      .leftJoinAndSelect('tinventoryline.oArticle', 'tinventoryline_oarticle')
      .leftJoinAndSelect('tinventoryline_oarticle.oCategory', 'tinventoryline_oarticle_category')
    return qb.getMany()
  }

  public async insert ({ data, options = {} }: { data: Partial<Inventory>, options?: DatabaseManagerOptions }): Promise<Inventory> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Inventory>, options?: DatabaseManagerOptions }): Promise<Inventory> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Inventory> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<Inventory> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }
}
