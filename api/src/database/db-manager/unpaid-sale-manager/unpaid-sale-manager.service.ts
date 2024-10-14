import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UnpaidSale } from 'src/database/entities/UnpaidSale.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class UnpaidSaleManagerService {
  constructor (@InjectRepository(UnpaidSale) private _repo: Repository<UnpaidSale>) {}

  public async list (filterUnpaidOnly : boolean): Promise<UnpaidSale[]> {
    let where : FindOptionsWhere<UnpaidSale> = null
    if (filterUnpaidOnly) {
      where = {
        isPaid : false
      }
    }
    return this._repo.find({
      where,
      relations : [ 'oSale' ]
    })
  }

  public async get (id: number): Promise<UnpaidSale> {
    return this._repo.findOne({
      where: {
        id
      },
      relations : [ 'oSale' ]
    })
  }

  public async insert (data: Partial<UnpaidSale>): Promise<UnpaidSale> {
    return this._repo.save(data)
  }

  public async update (id: number, data: Partial<UnpaidSale>): Promise<UnpaidSale> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<UnpaidSale> {
    await this.get(id)
    const stock: Partial<UnpaidSale> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }

}
