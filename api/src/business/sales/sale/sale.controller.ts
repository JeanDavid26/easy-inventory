import { Controller, Delete, Get, NotImplementedException, Post } from '@nestjs/common'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { Sale } from 'src/database/entities/Sale.entity'
import { SaleSession } from 'src/database/entities/saleSession.entity'
import { SaleService } from './sale.service'

@Controller('sale')
export class SaleController {

  constructor (
    private _saleService : SaleService,
    private _saleSessionManagerService : SaleSessionManagerService
  ) {}

  @Get('session')
  public async listSaleSessions () : Promise<SaleSession[]> {
    return this._saleSessionManagerService.list() 
  }

  @Post('session')
  public async openSession () : Promise<SaleSession> {
    return this._saleSessionManagerService.insert({})
  }
 
  @Post('session/close')
  public async closeSession () : Promise<SaleSession> {
    throw new NotImplementedException()
  }

  @Post()
  public async addSale () : Promise<Sale> {
    throw new NotImplementedException()
  }

  @Delete()
  public async removeSale () : Promise<Sale> {
    throw new NotImplementedException()
  }

}
