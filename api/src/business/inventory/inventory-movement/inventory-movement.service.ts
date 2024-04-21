import { Injectable } from '@nestjs/common'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { InventoryMovementManagerService } from 'src/database/db-manager/inventory-movement-manager/inventory-movement-manager.service'
import { MovementLineManagerService } from 'src/database/db-manager/movement-line-manager/movement-line-manager.service'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'
import { InsertInventoryMovementDto } from '../dto/insert-inventory-movement.dto'

@Injectable()
export class InventoryMovementService {

  constructor (
    private _inventoryLineManagerService : InventoryLineManagerService,
    private _inventoryMovementManagerService : InventoryMovementManagerService,
    private _movementLineManagerService : MovementLineManagerService
  ) {}

  public async insertInventoryMovement (oData : InsertInventoryMovementDto) : Promise<InventoryMovement> {
    return
  }
}
