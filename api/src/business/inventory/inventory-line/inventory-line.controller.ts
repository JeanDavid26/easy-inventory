import { BadRequestException, Body, Controller, Delete, Get, Param, Put } from '@nestjs/common'
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
    return this._inventoryLineManagerService.listByInventoryId({ inventoryId : Number(inventoryId) }
    )
  }

  @Put(':id')
  public updateInventoryLine (@Param('id') id: string, @Body() data : { quantity : number }): Promise<InventoryLine> {
    return this._inventoryLineManagerService.updateInventoryLineById({ id :Number(id), quantity : data.quantity })
  }

  @Delete(':id')
  public deleteInventoryLine (@Param('id') id: string): Promise<any> {
    const idCasted = Number(id)
    if (idCasted) {
      return this._inventoryLineManagerService.hardDelete({ id : Number(id) })
    }
    throw new BadRequestException('Argument invalide')
  }
}
