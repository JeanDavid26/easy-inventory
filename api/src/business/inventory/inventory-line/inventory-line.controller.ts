import { BadRequestException, Controller, Delete, Get, Param } from '@nestjs/common'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { InventoryLine } from 'src/database/entities/InventoryLine.entity'

@Controller('inventory-line')
export class InventoryLineController {
  constructor (
    private _inventoryLineManagerService: InventoryLineManagerService,
  ) {}

  @Get('list-inventory/:inventoryId')
  public listInventoryLinesByInventoryId (
    @Param('inventoryId') inventoryId: number,
  ): Promise<InventoryLine[]> {
    return this._inventoryLineManagerService.listByInventoryId(
      Number(inventoryId),
    )
  }

  @Delete(':id')
  public deleteInventoryLine (@Param('id') id: string): Promise<any> {
    const idCasted = Number(id)
    if (idCasted) {
      return this._inventoryLineManagerService.hardDelete(Number(id))
    }
    throw new BadRequestException('Argument invalide')
  }
}
