import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Sale } from 'src/database/entities/Sale.entity'
import { Between, Repository } from 'typeorm'

@Injectable()
export class SaleManagerService extends DatabaseManager<Sale> {
  constructor (@InjectRepository(Sale) private _repo: Repository<Sale>) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Sale> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      },
      relations : [ 'tSaleLine', 'tPayment' ]
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<Sale>, options?: DatabaseManagerOptions }): Promise<Sale> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Sale>, options?: DatabaseManagerOptions }): Promise<Sale> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Sale> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<Sale> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }

  public async getRecentSales ({ options = {} }: { options?: DatabaseManagerOptions }) : Promise<Sale[]> {
    const repo = this._getRepo(options)
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
    const sales = await repo.find({
      where: {
        deleteDate: null,
        creationDate:  Between(startOfMonth, endOfMonth)
      },
      order : { creationDate : 'DESC' }
    })
    return sales
  }
}
