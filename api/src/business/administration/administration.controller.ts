import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { InventoryTypeManagerService } from 'src/database/db-manager/inventory-type-manager/inventory-type-manager.service'
import { MovementTypeManagerService } from 'src/database/db-manager/movement-type-manager/movement-type-manager.service'
import { InventoryType } from 'src/database/entities/InventoryType.entity'
import { MovementType } from 'src/database/entities/MovementType.entity'
import { UpsertInventoryTypeDto } from './dto/upsert-Inventory-type.dto'
import { UpsertMovmentTypeDto } from './dto/upsert-movment-type.dto'

@Controller('administration')
export class AdministrationController {

  constructor (
    private _movementTypeManagerService : MovementTypeManagerService,
    private _inventoryTypeManagerService : InventoryTypeManagerService,
  ) {}

  // Movement Type
  @Get('movementtype')
  public listMovementType () : Promise<MovementType[]> {
    return this._movementTypeManagerService.list()
  }

  @Get('movementtype/:id')
  public getMovementType (@Param('id') id : number) : Promise<MovementType> {
    id = Number(id)
    return this._movementTypeManagerService.get(id)
  }

  @Post('movementtype')
  public insertMovementType (@Body() oData : UpsertMovmentTypeDto) : Promise<MovementType> {
    return this._movementTypeManagerService.insert(oData)
  }

  @Put('movementtype/:id')
  public updateMovementType (@Param('id') id : number, @Body() oData : UpsertMovmentTypeDto) : Promise<MovementType> {
    return this._movementTypeManagerService.update(id, oData)
  }

  @Delete('movementtype/:id')
  public deleteMovementType (@Param('id') id : number) : Promise<void> {
    return this._movementTypeManagerService.delete(id)
  }

  // Inventory Type
  @Get('inventorytype')
  public listInventoryType () : Promise<InventoryType[]> {
    return this._inventoryTypeManagerService.list()
  }

  @Get('inventorytype/:id')
  public getInventoryType (@Param('id') id : number) : Promise<InventoryType> {
    id = Number(id)
    return this._inventoryTypeManagerService.get(id)
  }

  @Post('inventorytype')
  public insertInventoryType (@Body() oData : UpsertInventoryTypeDto) : Promise<InventoryType> {
    return this._inventoryTypeManagerService.insert(oData)
  }

  @Put('inventorytype/:id')
  public updateInventoryType (@Param('id') id : number, @Body() oData : UpsertInventoryTypeDto) : Promise<InventoryType> {
    return this._inventoryTypeManagerService.update(id, oData)
  }

  @Delete('inventorytype/:id')
  public deleteInventoryType (@Param('id') id : number) : Promise<void> {
    return this._inventoryTypeManagerService.delete(id)
  }
}
