import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { parsePeriod } from 'src/shared/utils/parse-period.util'
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service'
import { Inventory } from 'src/database/entities/Inventory.entity'
import { UpsertInventoryDto } from '../dto/upsert-inventory.dto'
import { InventoryService, InventorySales } from './inventory.service'

@Controller('inventory')
export class InventoryController {
  constructor (
    private _inventoryManagerService: InventoryManagerService,
    private _inventoryService: InventoryService,
  ) { }

  @Get()
  public list (): Promise<Inventory[]> {
    return this._inventoryService.list()
  }

  @Get(':id/sales')
  public getSales (@Param('id') id: number, @Query('from') from?: string, @Query('to') to?: string): Promise<InventorySales> {
    const period = parsePeriod(from, to)
    return this._inventoryService.getSales(Number(id), period.from, period.to)
  }

  @Get(':id')
  public get (@Param('id') id: number): Promise<Inventory> {
    id = Number(id)
    return this._inventoryService.get(id)
  }

  @Put(':id')
  public update (@Param(':id') id: number, @Body() data: UpsertInventoryDto): Promise<Inventory> {
    id = Number(id)
    return this._inventoryManagerService.update({ id, data })
  }

  @Post()
  public insert (@Body() data: UpsertInventoryDto): Promise<Inventory> {
    return this._inventoryManagerService.insert({ data })
  }

  @Delete(':id')
  public delete (@Param('id') id: number): Promise<void> {
    return this._inventoryService.delete(id)
  }
}
