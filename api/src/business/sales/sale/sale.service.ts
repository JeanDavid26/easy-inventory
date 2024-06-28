import { Injectable } from '@nestjs/common'
import { PaymentManagerService } from 'src/database/db-manager/payment-manager/payment-manager.service'
import { SaleLineManagerService } from 'src/database/db-manager/sale-line-manager/sale-line-manager.service'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'

@Injectable()
export class SaleService {

  constructor (
    private _saleManagerService : SaleManagerService,
    private _saleSessionManagerService : SaleSessionManagerService,
    private _saleLineManagerService : SaleLineManagerService,
    private _paymentManagerService : PaymentManagerService
  ) {}
  
}
