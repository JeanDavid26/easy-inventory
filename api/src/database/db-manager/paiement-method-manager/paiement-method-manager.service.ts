import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaymentMethod } from 'src/database/entities/PaiementMethod.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PaiementMethodManagerService {

  constructor (
    @InjectRepository(PaymentMethod)
    private _repo: Repository<PaymentMethod>,
  ) {}

  public async list (): Promise<PaymentMethod[]> {
    return this._repo.find()
  }

  public async get (id: number): Promise<PaymentMethod> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }
 
}
