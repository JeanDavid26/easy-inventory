import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UnpaidSaleManagerService } from 'src/database/db-manager/unpaid-sale-manager/unpaid-sale-manager.service'
import { UnpaidSale } from 'src/database/entities/UnpaidSale.entity'

@Controller('unpaid')
export class UnpaidController {

  constructor (
    private _unpaidSaleManagerSerivce : UnpaidSaleManagerService
  ) {}

  @Get()
  public listUnpaidSale (@Query('unpaidOnly') unpaidOnly : boolean) : Promise<UnpaidSale[]> {
    return this._unpaidSaleManagerSerivce.list(unpaidOnly ?? false)
  }

}
