import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { UnpaidSale } from 'src/database/entities/UnpaidSale.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class UnpaidSaleManagerService extends DatabaseManager<UnpaidSale> {
  constructor (@InjectRepository(UnpaidSale) private _repo: Repository<UnpaidSale>) {
    super(_repo)
  }

  public async list ({ filterUnpaidOnly, options = {} }: { filterUnpaidOnly: boolean, options?: DatabaseManagerOptions }): Promise<UnpaidSale[]> {
    const repo = this._getRepo(options)
    let where : FindOptionsWhere<UnpaidSale> = null
    if (filterUnpaidOnly) {
      where = {
        isPaid : false
      }
    }
    return repo.find({
      where,
      relations : [ 'oSale' ]
    })
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<UnpaidSale> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      },
      relations : [ 'oSale' ]
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<UnpaidSale>, options?: DatabaseManagerOptions }): Promise<UnpaidSale> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<UnpaidSale>, options?: DatabaseManagerOptions }): Promise<UnpaidSale> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<UnpaidSale> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<UnpaidSale> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }

}
