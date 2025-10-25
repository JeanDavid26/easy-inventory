import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Payment } from 'src/database/entities/Payment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PaymentManagerService extends DatabaseManager<Payment> {

  constructor (@InjectRepository(Payment) private _repo: Repository<Payment>) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Payment> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<Payment>, options?: DatabaseManagerOptions }): Promise<Payment> {
    const repo = this._getRepo(options)
    delete data.id
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Payment>, options?: DatabaseManagerOptions }): Promise<Payment> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Payment> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const data: Partial<Payment> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(data)
  }
}
