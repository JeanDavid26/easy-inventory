import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { SaleLine } from 'src/database/entities/SaleLine.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SaleLineManagerService extends DatabaseManager<SaleLine> {
  constructor (
    @InjectRepository(SaleLine) private _repo: Repository<SaleLine>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<SaleLine>, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<SaleLine>, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<SaleLine> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }
}
