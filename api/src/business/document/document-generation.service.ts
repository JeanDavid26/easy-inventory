import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { Decimal } from 'decimal.js'
import { SaleSessionManagerService } from 'src/database/db-manager/sale-session-manager/sale-session-manager.service'
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service'
import { ArticleLineData, SaleData, SaleSessionReportDataset } from './models/sale-session-report-dataset.model'
import { PaymentMethodEnum } from 'src/database/@models/payment-method.enum'
import { SaleSession } from 'src/database/entities/SaleSession.entity'
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service'

@Injectable()
export class DocumentGenerationService {

  constructor (
    private _saleSessionManagerService : SaleSessionManagerService,
    private _inventoryManagerService : InventoryManagerService,
    private _pdfGeneratorService : PdfGeneratorService
  ) {}

  async generateSaleSessionReport (saleSessionId : number, res: Response) : Promise<void> {
    const oSaleSession = await this._saleSessionManagerService.get({ id : saleSessionId })

    const dataset = this._mapDataset(oSaleSession)
    
    const pdfBuffer = await this._pdfGeneratorService.generatePdf('sale-resume', dataset)
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="rapport-session-${oSaleSession.id}.pdf"`)
    res.send(pdfBuffer)
  }

  async generateInventoryState (inventoryId : number, res: Response) : Promise<void> {
    const oInventory = await this._inventoryManagerService.get({ id : inventoryId })

    const dataset = this._mapInventoryDataset(oInventory)
    
    const pdfBuffer = await this._pdfGeneratorService.generatePdf('inventory-state', dataset)
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="etat-stock-${oInventory.id}.pdf"`)
    res.send(pdfBuffer)
  }

  private _mapDataset ({ tSale, changeFund, saleSessionReference } : SaleSession) : SaleSessionReportDataset {
    let cashTotal = 0
    let checkTotal = 0
    let cardTotal = 0 
    let unpaidTotal = 0
    let totalQuantity = 0

    const tSaleData : SaleData[] = tSale.map((sale, index)=> {

      const saleCashTotal = sale.tPayment.filter((payment)=> payment.paymentMethodId === PaymentMethodEnum.ESPECE).reduce((acc, curr) =>{
        return new Decimal(acc).add(curr.amount).toNumber()
      }, 0)
      const saleCheckTotal = sale.tPayment.filter((payment)=> payment.paymentMethodId === PaymentMethodEnum.CHEQUE).reduce((acc, curr) =>{
        return new Decimal(acc).add(curr.amount).toNumber()
      }, 0)
      const saleCardTotal = sale.tPayment.filter((payment)=> payment.paymentMethodId === PaymentMethodEnum.CB).reduce((acc, curr) =>{
        return new Decimal(acc).add(curr.amount).toNumber()
      }, 0)
      const saleUnpaidTotal = sale.tPayment.filter((payment)=> payment.paymentMethodId === PaymentMethodEnum.IMPAYE).reduce((acc, curr) => {
        return new Decimal(acc).add(curr.amount).toNumber()
      }, 0)
      const quantity = sale.tSaleLine.reduce((acc, curr)=> {
        return new Decimal(acc).add(curr.quantity).toNumber()
      }, 0)
      cashTotal = new Decimal(cashTotal).add(saleCashTotal).toNumber()
      checkTotal = new Decimal(checkTotal).add(saleCheckTotal).toNumber()
      cardTotal = new Decimal(cardTotal).add(saleCardTotal).toNumber()
      unpaidTotal = new Decimal(unpaidTotal).add(saleUnpaidTotal).toNumber()
      totalQuantity = new Decimal(totalQuantity).add(quantity).toNumber()

      const saleData : SaleData = {
        clientId : index,
        tArticleLine : sale.tSaleLine.map(({ oArticle, salePrice, quantity })=>{
          const articleLineData : ArticleLineData = {
            reference : oArticle.referenceCode,
            name : oArticle.label,
            unitPrice : `${salePrice} €`,
            quantity
          }
          return articleLineData 
        }),
        cardTotal : `${saleCardTotal.toFixed(2)} €`,
        chequeTotal : `${saleCheckTotal.toFixed(2)} €`,
        cashTotal : `${saleCashTotal.toFixed(2)} €`,
        itemTotal : quantity.toString(),
        unpaid : `${saleUnpaidTotal.toFixed(2)} €`
      }

      return saleData
    })
  
    return {
      company : {
        name : 'Bibliothèque AJEF'
      },
      sales : tSaleData,
      totals : {
        card : `${cardTotal.toFixed(2)} €`,
        cash : `${cashTotal.toFixed(2)} €`,
        cheques : `${checkTotal.toFixed(2)} €`,
        items : totalQuantity.toString()
      },
      startingCash : `${changeFund} €`,
      cashAfterSale : `${new Decimal(changeFund).add(cashTotal).toFixed(2)} €`,
      totalSales: `${new Decimal(cashTotal).add(checkTotal).add(cardTotal).toFixed(2)} €`,
      saleNumber: saleSessionReference 

    }
  }

  private _mapInventoryDataset (oInventory: any) {
    let totalValue = new Decimal(0)
    let totalItems = 0

    const lines = oInventory.tInventoryLine.map(({ oArticle, quantity }) => {
      const unitPrice = new Decimal(oArticle.unitPrice)
      const quantityDecimal = new Decimal(quantity)
      const lineTotal = unitPrice.times(quantityDecimal)
      
      totalValue = totalValue.plus(lineTotal)
      totalItems += quantity

      return {
        referenceCode: oArticle.referenceCode,
        label: oArticle.label,
        category: oArticle.oCategory?.label || 'N/A',
        unitPrice: `${unitPrice.toFixed(2).replace('.', ',')} €`,
        quantity: quantity.toString(),
        total: `${lineTotal.toFixed(2).replace('.', ',')} €`
      }
    }).sort((a, b) => a.referenceCode.localeCompare(b.referenceCode))

    const now = new Date()
    const formattedDate = `${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`

    return {
      inventoryLabel: oInventory.label,
      inventoryType: oInventory.oInventoryType?.label || 'Standard',
      currentDate: formattedDate,
      lines,
      totalItems,
      totalValue: `${totalValue.toFixed(2).replace('.', ',')} €`
    }
  }

}
