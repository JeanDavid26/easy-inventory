import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Sale } from 'src/database/entities/Sale.entity'
import { Between, Repository } from 'typeorm'

@Injectable()
export class SaleManagerService {
  constructor (@InjectRepository(Sale) private _repo: Repository<Sale>) {}

  public async get (id: number): Promise<Sale> {
    return this._repo.findOne({
      where: {
        id
      },
      relations : [ 'tSaleLine', 'tPayment' ]
    })
  }

  public async insert (data: Partial<Sale>): Promise<Sale> {
    return this._repo.save(data)
  }

  public async update (id: number, data: Partial<Sale>): Promise<Sale> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<Sale> {
    await this.get(id)
    const stock: Partial<Sale> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }

  public async getRecentSales () : Promise<Sale[]> {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
    const sales = await this._repo.find({
      where: {
        deleteDate: null,
        creationDate:  Between(startOfMonth, endOfMonth)
      },
      order : { creationDate : 'DESC' }
    })
    return sales
  }
}
