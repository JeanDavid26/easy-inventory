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

  public async insert (data: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<PaymentMethod>,
  ): Promise<PaymentMethod> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<void> {
    await this.get(id)

    await this._repo.delete(id)
  }
}
