import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'
import { Repository } from 'typeorm'

@Injectable()
export class InventoryMovementManagerService {
  constructor (
    @InjectRepository(InventoryMovement)
    private _repo: Repository<InventoryMovement>,
  ) {}

  public listByInventoryId (inventoryId : number) : Promise<InventoryMovement[]> {
    return this._repo.find({
      where : [ 
        { destinationInventoryId : inventoryId },
        { sourceInventoryId : inventoryId }
      ],
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType' ],
      order : { dateTime : 'ASC' }
    })
  }

  public async get (id: number): Promise<InventoryMovement> {
    return this._repo.findOne({
      where: {
        id
      },
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType', 'tMovementLine', 'tMovementLine.oArticle' ]

    })
  }

  public async insert (
    data: Partial<InventoryMovement>,
  ): Promise<InventoryMovement> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<InventoryMovement>,
  ): Promise<InventoryMovement> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<InventoryMovement> {
    await this.get(id)
    const stock: Partial<InventoryMovement> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }

  public async getRecentMovements () : Promise<InventoryMovement[]> {
    return this._repo.find({
      where: {
        deleteDate: null
      },
      relations : [ 'oSourceInventory', 'oDestinationInventory', 'oMovementType', 'tMovementLine', 'tMovementLine.oArticle' ],
      order : { dateTime : 'DESC' },
      take : 5
    })
  }
}
