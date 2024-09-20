import { Controller, Get, Param } from '@nestjs/common'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { InventoryLine } from 'src/database/entities/InventoryLine.entity'

@Controller('inventory-line')
export class InventoryLineController {

  constructor (
    private _inventoryLineManagerService : InventoryLineManagerService
  ) {}
    
  @Get('list-inventory/:inventoryId')
  public listInventoryLinesByInventoryId (@Param('inventoryId') inventoryId : number) : Promise<InventoryLine[]> {
    return this._inventoryLineManagerService.listByInventoryId(Number(inventoryId))
  }
}
