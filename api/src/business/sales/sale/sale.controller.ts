import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put } from '@nestjs/common'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { Sale } from 'src/database/entities/Sale.entity'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { SaleService } from './sale.service'
import { InsertSaleDto } from '../dto/insert-sale.dto'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'

@Controller('sale')
export class SaleController {

  constructor (
    private _saleService : SaleService,
    private _saleSessionManagerService : SaleSessionManagerService,
    private _saleManagerService : SaleManagerService
  ) {}

  @Get('session')
  public async listSaleSessions () : Promise<SaleSession[]> {
    return this._saleSessionManagerService.list() 
  }

  @Get('session/:id')
  public async getSaleSessions (@Param('id') id : number) : Promise<SaleSession> {
    return this._saleSessionManagerService.get(id) 
  }

  @Post('session/open')
  public async openSession () : Promise<SaleSession> {
    return this._saleSessionManagerService.insert({})
  }
 
  @Put('session/close/:id')
  public async closeSession (@Param('id') id:number) : Promise<SaleSession> {
    return this._saleService.closeSession(Number(id))
  }

  @Get(':id')
  public async getSale (@Param('id') id: number) : Promise<Sale> {
    return this._saleManagerService.get(id)
  }

  @Post()
  public async addSale (@Body() data : InsertSaleDto) : Promise<Sale> {
    return this._saleService.addSale(data)
  }

  @Delete(':id')
  public async removeSale (@Param('id') id : number) : Promise<Sale> {
    return this._saleManagerService.delete(id)
  }

}
