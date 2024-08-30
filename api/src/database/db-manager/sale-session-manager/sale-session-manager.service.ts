import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SaleSessionManagerService {

  constructor (@InjectRepository(SaleSession) private _repo: Repository<SaleSession>) {}

  public async list (): Promise<SaleSession[]> {
    return this._repo.find({
      
    })
  }

  public async get (id: number): Promise<SaleSession> {
    return this._repo.findOne({
      where: {
        id
      },
      relations : [ 'tSale', 'tSale.tSaleLine' ]
    })
  }

  public async insert (data: Partial<SaleSession>): Promise<SaleSession> {
    return this._repo.save(data)
  }

  public async update (id: number, data: Partial<SaleSession>): Promise<SaleSession> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<SaleSession> {
    await this.get(id)
    const data: Partial<SaleSession> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(data)
  }
}
