import { Body, Controller, Delete, Get, NotImplementedException, Param, Post } from '@nestjs/common'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { Sale } from 'src/database/entities/Sale.entity'
import { SaleSession } from 'src/database/entities/saleSession.entity'
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
 
  @Post('session/close')
  public async closeSession () : Promise<SaleSession> {
    throw new NotImplementedException()
  }

  @Get(':id')
  public async getSale (@Param('id') id: number) : Promise<Sale> {
    return this._saleManagerService.get(id)
  }


  @Post()
  public async addSale (@Body() data : InsertSaleDto) : Promise<Sale> {
    throw new NotImplementedException()
  }

  @Delete('session/:idSession/sale/:id')
  public async removeSale () : Promise<Sale> {
    throw new NotImplementedException()
  }

}
