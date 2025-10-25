import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { PaymentMethod } from 'src/database/entities/PaiementMethod.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PaiementMethodManagerService extends DatabaseManager<PaymentMethod> {
  constructor (
    @InjectRepository(PaymentMethod)
    private _repo: Repository<PaymentMethod>,
  ) {
    super(_repo)
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<PaymentMethod[]> {
    const repo = this._getRepo(options)
    return repo.find()
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<PaymentMethod> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }
 
}
