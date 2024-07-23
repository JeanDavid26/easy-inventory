import { Injectable } from '@nestjs/common'
import { PaymentManagerService } from 'src/database/db-manager/payment-manager/payment-manager.service'
import { SaleLineManagerService } from 'src/database/db-manager/sale-line-manager/sale-line-manager.service'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { InsertSaleDto } from '../dto/insert-sale.dto'
import { Sale } from 'src/database/entities/Sale.entity'
import { Connection } from 'typeorm'

@Injectable()
export class SaleService {

  constructor (
    private _saleManagerService : SaleManagerService,
    private _saleSessionManagerService : SaleSessionManagerService,
    private _saleLineManagerService : SaleLineManagerService,
    private _paymentManagerService : PaymentManagerService
    ) {}    

  public async addSale (data :  InsertSaleDto) : Promise<Sale>{
    
    const oSale = await this._saleManagerService.insert({
      totalAmount : data.totalAmount,
      saleSessionId: data.saleSessionId,
    })

    const tSaleLinePromises = data.tSaleLine.map((saleLinde)=> {
      return this._saleLineManagerService.insert({
        saleId : oSale.id,
        quantity : saleLinde.quantity,
        articleId : saleLinde.articleId,
        salePrice : saleLinde.salePrice
      })
    })

    const tPayementPromises = data.tPayment.map((payment)=> {
      return this._paymentManagerService.insert({
        amount : payment.amount,
        paymentMethodId : payment.paymentMethodId,
        saleId : oSale.id,
      })
    })
    
    await Promise.all([... tSaleLinePromises, ... tPayementPromises])
    
    return oSale
  }

  
}
