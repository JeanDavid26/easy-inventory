import { BadRequestException, Injectable } from '@nestjs/common'
import { PaymentManagerService } from 'src/database/db-manager/payment-manager/payment-manager.service'
import { SaleLineManagerService } from 'src/database/db-manager/sale-line-manager/sale-line-manager.service'
import { SaleManagerService } from 'src/database/db-manager/sale-manager/sale-manager.service'
import { InsertSaleDto } from './dto/insert-sale.dto'
import { Sale } from 'src/database/entities/Sale.entity'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'
import { UnpaidSaleManagerService } from 'src/database/db-manager/unpaid-sale-manager/unpaid-sale-manager.service'
import { ArticleManagerService } from 'src/database/db-manager/article-manager/article-manager.service'
import { UpdateSaleSessionDto } from './dto/update-sale-session.dto'
import { SaleStatus } from 'src/database/@models/sale-status.enum'
import { DataSource, EntityManager } from 'typeorm'

@Injectable()
export class SaleService {

  constructor (
    private _saleManagerService: SaleManagerService,
    private _saleLineManagerService: SaleLineManagerService,
    private _saleSessionManagerService: SaleSessionManagerService,
    private _inventoryLineManagerService: InventoryLineManagerService,
    private _unpaidSaleManagerSerivce: UnpaidSaleManagerService,
    private _paymentManagerService: PaymentManagerService,
    private _articleManagerService: ArticleManagerService,
    private readonly _dataSource: DataSource,
  ) { }

  public async addSale (data: InsertSaleDto): Promise<Sale> {

    return this._dataSource.transaction(async entityTransactionManager => {
      const oSale = await this._saleManagerService.insert({ data :{
        totalAmount: Number(data.totalAmount),
        saleSessionId: Number(data.saleSessionId)
      }, options : { entityTransactionManager } })

      const tSaleLinePromises = data.tSaleLine.map((saleLinde) => {
        return this._saleLineManagerService.insert({ data: {
          saleId: oSale.id,
          quantity: saleLinde.quantity,
          articleId: saleLinde.articleId,
          salePrice: Number(saleLinde.salePrice)
        }, options : { entityTransactionManager } })
      })
      const tUnpaidSalePromises = []
      const tPayementPromises = data.tPayment.map((payment) => {
        if (payment.paymentMethodId === 4) {
          tUnpaidSalePromises.push(this._unpaidSaleManagerSerivce.insert({ data:{
            saleId: oSale.id
          }, options : { entityTransactionManager } }))
        }
        return this._paymentManagerService.insert({ data: {
          amount: Number(payment.amount),
          paymentMethodId: payment.paymentMethodId,
          saleId: oSale.id
        }, options : { entityTransactionManager } })
      })

      await Promise.all([ ...tSaleLinePromises, ...tPayementPromises, ...tUnpaidSalePromises ])

      return oSale
    })
   
  }

  public async closeSession (id: number): Promise<SaleSession> {
    return this._dataSource.transaction(async entityTransactionManager => {
      const oSaleSession = await this._saleSessionManagerService.get({ id })
      const tPromise = []
      for (const oSale of oSaleSession.tSale) {
        tPromise.push(...oSale.tSaleLine.map((saleLine) => {
          return this._updateInventoryLine({ articleId: saleLine.articleId, quantity: saleLine.quantity, entityTransactionManager })
        }))
      }
      await Promise.all(tPromise)
      return this._saleSessionManagerService.update({
        id: oSaleSession.id,
        data: {
          status: 'closed'
        },
        options: { entityTransactionManager } })
    })
  }

  public async uncloseSession (id: number): Promise<void> {

    const oSaleSession = await this._saleSessionManagerService.get({ id })
    await this._dataSource.transaction(async entityTransactionManager => {
      await Promise.all(oSaleSession.tSale.map(sale => this._undoSale({ sale, entityTransactionManager })))
      await this._saleSessionManagerService.update({ id: oSaleSession.id, data :{
        status: SaleStatus.ONGOING
      }, options : { entityTransactionManager } })
    })
   
  }
  private async _undoSale ({ sale, entityTransactionManager } :{sale: Sale, entityTransactionManager : EntityManager}): Promise<void> {
    await Promise.all(
      sale.tSaleLine.map((saleLine) => {
        return this._inventoryLineManagerService.updateInventoryLine({ articleId: saleLine.articleId, quantity: saleLine.quantity, isAdding: true, options : { entityTransactionManager } })
      })
    )
  }

  private async _updateInventoryLine ({ articleId, quantity, entityTransactionManager }: { articleId: number, quantity: number, entityTransactionManager: EntityManager }): Promise<void> {
    const oArticle = await this._articleManagerService.get({ id : articleId, options:{ entityTransactionManager } })
    if (!oArticle.isNotStorable) {
      await this._inventoryLineManagerService.updateInventoryLine({ articleId: articleId, quantity: quantity, options :{ entityTransactionManager } })
    }
  }

  public async getRecentSales (): Promise<number[]> {
    const salesOfTheMonth = await this._saleManagerService.getRecentSales({})
    // Split the sales in each week of the month and return an arry of the total amount of each week
    // the return should be an array of 4 number which each represent the total amount of the week  
    const salesByWeek = [ 0, 0, 0, 0 ]
    for (const oSale of salesOfTheMonth) {
      const week = Math.floor((oSale.creationDate.getDate() - 1) / 7)
      salesByWeek[week] += oSale.totalAmount
    }
    return salesByWeek
  }

  public updateSaleSession (id: number, body: UpdateSaleSessionDto): Promise<SaleSession> {
    const oSaleSession = this._saleSessionManagerService.get({ id })

    if (!oSaleSession) {
      throw new BadRequestException('La session de vente n\'existe pas.')
    }

    return this._saleSessionManagerService.update({ id, data: {
      ...oSaleSession,
      ...body
    } })
  }
}
