import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InventoryType } from 'src/database/entities/InventoryType.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryTypeManagerService {

  constructor (
        @InjectRepository(InventoryType)
        private _repo: Repository<InventoryType>,
  ) {}

  public async list (): Promise<InventoryType[]> {
    return this._repo.find()
  }

  public async get (id: number): Promise<InventoryType> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert (data: Partial<InventoryType>): Promise<InventoryType> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<InventoryType>,
  ): Promise<InventoryType> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<void> {
    await this.get(id)
   
    await this._repo.delete(id)
  }
}
