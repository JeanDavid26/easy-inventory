import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryMovementManagerService extends DatabaseManager<InventoryMovement> {
  constructor (
    @InjectRepository(InventoryMovement)
    private _repo: Repository<InventoryMovement>,
  ) {
    super(_repo)
  }

  public async listByInventoryId ({ inventoryId, options = {} }: { inventoryId: number, options?: DatabaseManagerOptions }): Promise<InventoryMovement[]> {
    const repo = this._getRepo(options)
    return repo.find({
      where : [ 
        { destinationInventoryId : inventoryId },
        { sourceInventoryId : inventoryId }
      ],
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType' ],
      order : { dateTime : 'ASC' }
    })
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<InventoryMovement> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      },
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType', 'tMovementLine', 'tMovementLine.oArticle' ]
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<InventoryMovement>, options?: DatabaseManagerOptions }): Promise<InventoryMovement> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<InventoryMovement>, options?: DatabaseManagerOptions }): Promise<InventoryMovement> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<InventoryMovement> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<InventoryMovement> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }

  public async getRecentMovements ({ options = {} }: {options?: DatabaseManagerOptions}) : Promise<InventoryMovement[]> {
    const repo = this._getRepo(options)
    return repo.find({
      where: {
        deleteDate: null
      },
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType', 'tMovementLine', 'tMovementLine.oArticle' ],
      order : { dateTime : 'DESC' },
      take : 5
    })
  }
}
