import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Payment } from 'src/database/entities/payment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PaymentManagerService {

  constructor (@InjectRepository(Payment) private _repo: Repository<Payment>) {}

  public async get (id: number): Promise<Payment> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert (data: Partial<Payment>): Promise<Payment> {
    return this._repo.save(data)
  }

  public async update (id: number, data: Partial<Payment>): Promise<Payment> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<Payment> {
    await this.get(id)
    const data: Partial<Payment> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(data)
  }
}
