import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { Sale } from 'src/database/entities/Sale.entity'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { SaleService } from './sale.service'
import { InsertSaleDto } from './dto/insert-sale.dto'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'
import { UpdateSaleSessionDto } from './dto/update-sale-session.dto'

@Controller('sale')
export class SaleController {

  constructor (
    private _saleService: SaleService,
    private _saleSessionManagerService: SaleSessionManagerService,
    private _saleManagerService: SaleManagerService
  ) { }

  @Get('session')
  public async listSaleSessions (): Promise<SaleSession[]> {
    return this._saleSessionManagerService.list({})
  }

  @Get('session/:id')
  public async getSaleSessions (@Param('id') id: number): Promise<SaleSession> {
    return this._saleSessionManagerService.get({ id })
  }

  @Post('session/open')
  public async openSession (): Promise<SaleSession> {
    return this._saleSessionManagerService.insert({ data : {} })
  }

  @Put('session/:id')
  public async updateSaleSession (@Param('id') id: number, @Body() body: UpdateSaleSessionDto): Promise<SaleSession> {
    return this._saleService.updateSaleSession(id, body)
  }

  @Put('session/close/:id')
  public async closeSession (@Param('id') id: number): Promise<SaleSession> {
    return this._saleService.closeSession(Number(id))
  }

  @Put('session/unclose/:id')
  public async uncloseSession (@Param('id') id: number): Promise<void> {
    await this._saleService.uncloseSession(Number(id))
  }

  @Delete('session/:id')
  public async softDeleteSaleSession (@Param('id') id: number): Promise<SaleSession> {
    return this._saleSessionManagerService.delete({ id :Number(id) })
  }

  @Get('recent-sales')
  public async getRecentSales (): Promise<number[]> {
    return this._saleService.getRecentSales()
  }

  @Get(':id')
  public async getSale (@Param('id') id: number): Promise<Sale> {
    return this._saleManagerService.get({ id })
  }

  @Post()
  public async addSale (@Body() data: InsertSaleDto): Promise<Sale> {
    return this._saleService.addSale(data)
  }
  // TODO: Ajouter un propriété remise pour gérer un pourcentage afin de mettre à jour le stock mais avoir la compta ok

  @Delete(':id')
  public async removeSale (@Param('id') id: number): Promise<Sale> {
    return this._saleManagerService.delete({ id })
  }

}
