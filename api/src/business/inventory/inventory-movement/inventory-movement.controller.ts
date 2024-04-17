import { Body, Controller, NotImplementedException, Post } from '@nestjs/common'
import { InventoryMovementService } from './inventory-movement.service'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'

@Controller('inventory-movement')
export class InventoryMovementController {

  constructor (
    private _inventoryMovementService : InventoryMovementService
  ) {}

  @Post()
  public insertInventoryMovement (@Body() oData : any) : Promise<InventoryMovement> {
    throw new NotImplementedException()
  }
}
