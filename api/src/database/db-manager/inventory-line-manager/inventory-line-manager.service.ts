import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InventoryLine } from 'src/database/entities/InventoryLine.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryLineManagerService {
  constructor (
    @InjectRepository(InventoryLine) private _repo: Repository<InventoryLine>,
  ) {}

  public async get (id: number): Promise<InventoryLine> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async getByInventoryIdAndArticleId (inventoryId : number, articleId : number) : Promise<InventoryLine> {
    return this._repo.findOne({
      where : {
        articleId,
        inventoryId
      }
    })
  }

  public async insert (data: Partial<InventoryLine>): Promise<InventoryLine> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<InventoryLine>,
  ): Promise<InventoryLine> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<InventoryLine> {
    await this.get(id)
    const stock: Partial<InventoryLine> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }
}
