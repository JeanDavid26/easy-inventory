import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SaleSessionManagerService extends DatabaseManager<SaleSession> {

  constructor (@InjectRepository(SaleSession) private _repo: Repository<SaleSession>) {
    super(_repo)
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<SaleSession[]> {
    const repo = this._getRepo(options)
    return repo.find({
      order: { creationDate: 'DESC' }
    })
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<SaleSession> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      },
      relations: [ 'tSale', 'tSale.tSaleLine', 'tSale.tSaleLine.oArticle', 'tSale.tPayment', 'tSale.tPayment.oPaymentMethod' ]
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<SaleSession>, options?: DatabaseManagerOptions }): Promise<SaleSession> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<SaleSession>, options?: DatabaseManagerOptions }): Promise<SaleSession> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }:{ id: number, options? : DatabaseManagerOptions }): Promise<SaleSession> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const data: Partial<SaleSession> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(data)
  }
}
