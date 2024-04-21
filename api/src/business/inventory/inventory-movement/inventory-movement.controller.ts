import { Body, Controller, Get, NotImplementedException, Param, Post } from '@nestjs/common'
import { InventoryMovementService } from './inventory-movement.service'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'
import { InsertInventoryMovementDto } from '../dto/insert-inventory-movement.dto'
import { InventoryMovementManagerService } from 'src/database/db-manager/inventory-movement-manager/inventory-movement-manager.service'

@Controller('inventory-movement')
export class InventoryMovementController {

  constructor (
    private _inventoryMovementService : InventoryMovementService,
    private _inventoryMovementManagerService : InventoryMovementManagerService
  ) {}

  @Post()
  public insertInventoryMovement (@Body() oData : InsertInventoryMovementDto) : Promise<InventoryMovement> {
    return this._inventoryMovementService.insertInventoryMovement(oData)
  }

  @Get('list-inventory/:inventoryId')
  public listInventoryMovementByInventoryId (@Param('inventoryId') inventoryId : number) : Promise<InventoryMovement[]> {
    return this._inventoryMovementManagerService.listByInventoryId(inventoryId)
  }
}
