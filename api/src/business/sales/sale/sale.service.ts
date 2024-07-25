import { Injectable } from '@nestjs/common'
import { PaymentManagerService } from 'src/database/db-manager/payment-manager/payment-manager.service'
import { SaleLineManagerService } from 'src/database/db-manager/sale-line-manager/sale-line-manager.service'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'
import { InsertSaleDto } from '../dto/insert-sale.dto'
import { Sale } from 'src/database/entities/Sale.entity'

@Injectable()
export class SaleService {

  constructor (
    private _saleManagerService : SaleManagerService,
    private _saleLineManagerService : SaleLineManagerService,
    private _paymentManagerService : PaymentManagerService
  ) {}    

  public async addSale (data : InsertSaleDto) : Promise<Sale> {
    
    const oSale = await this._saleManagerService.insert({
      totalAmount : Number(data.totalAmount),
      saleSessionId: data.saleSessionId
    })
    console.log(oSale)
    const tSaleLinePromises = data.tSaleLine.map((saleLinde)=> {
      return this._saleLineManagerService.insert({
        saleId : oSale.id,
        quantity : saleLinde.quantity,
        articleId : saleLinde.articleId,
        salePrice : Number(saleLinde.salePrice)
      })
    })

    const tPayementPromises = data.tPayment.map((payment)=> {
      return this._paymentManagerService.insert({
        amount : Number(payment.amount),
        paymentMethodId : payment.paymentMethodId,
        saleId : oSale.id
      })
    })
    
    await Promise.all([ ... tSaleLinePromises, ... tPayementPromises ])
    
    return oSale
  }
  
}
