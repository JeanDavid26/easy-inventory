import { BadRequestException, Injectable } from '@nestjs/common'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { InventoryMovementManagerService } from 'src/database/db-manager/inventory-movement-manager/inventory-movement-manager.service'
import { MovementLineManagerService } from 'src/database/db-manager/movement-line-manager/movement-line-manager.service'
import { InventoryMovement } from 'src/database/entities/InventoryMovement.entity'
import { InsertInventoryMovementDto } from '../dto/insert-inventory-movement.dto'
import { MovementTypeManagerService } from 'src/database/db-manager/movement-type-manager/movement-type-manager.service'
import { MovementLine } from 'src/database/entities/MovementLine.entity'

@Injectable()
export class InventoryMovementService {

  constructor (
    private _inventoryLineManagerService : InventoryLineManagerService,
    private _inventoryMovementManagerService : InventoryMovementManagerService,
    private _movementLineManagerService : MovementLineManagerService,
    private _movementTypeManagerService : MovementTypeManagerService
  ) {}

  public async insertInventoryMovement (oData : InsertInventoryMovementDto) : Promise<InventoryMovement> {
    const oMovementType = await this._movementTypeManagerService.get(oData.movementTypeId)
    if (oMovementType.isInternal && !oData.sourceInventoryId && !oData.destinationInventoryId) {
      throw new BadRequestException('Un mouvement interne doit avoir une source et une destination')
    }
    
    const partialMovement : Partial<InventoryMovement> = {
      movementTypeId : oData.movementTypeId,
      destinationInventoryId : oData.destinationInventoryId,
      sourceInventoryId : oData.sourceInventoryId ? oData.sourceInventoryId : null,
      reference : oData.reference,
      dateTime : oData.dateTime
    }
    
    const inventoryMovementInserted = await this._inventoryMovementManagerService.insert(partialMovement)

    for (const oMovementLineDto of oData.movementLines) {
      const partialMovementLine : Partial<MovementLine> = {
        articleId : oMovementLineDto.articleId,
        quantity : oMovementLineDto.quantity,
        movementId : inventoryMovementInserted.id
      }

      const movementLineInserted = await this._movementLineManagerService.insert(partialMovementLine)
    }
    return
  }
}
