import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { InventoryType } from 'src/database/entities/InventoryType.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryTypeManagerService extends DatabaseManager<InventoryType> {
  constructor (
        @InjectRepository(InventoryType)
        private _repo: Repository<InventoryType>,
  ) {
    super(_repo)
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<InventoryType[]> {
    const repo = this._getRepo(options)
    return repo.find()
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<InventoryType> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<InventoryType>, options?: DatabaseManagerOptions }): Promise<InventoryType> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<InventoryType>, options?: DatabaseManagerOptions }): Promise<InventoryType> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<void> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    await repo.delete(id)
  }
}
