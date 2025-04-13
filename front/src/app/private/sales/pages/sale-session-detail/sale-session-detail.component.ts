import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleSession } from '../../../../@models/entities/SaleSession.interface';
import { Sale } from '../../../../@models/entities/Sale.interface';
import { SaleService } from '../../../../core/services/sale.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { tap } from 'rxjs';
import { PaymentMethodEnum } from '../../../../@models/enum/payment-method.enum';

@Component({
  selector: 'app-sale-session-detail',
  templateUrl: './sale-session-detail.component.html',
  styleUrl: './sale-session-detail.component.scss'
})
export class SaleSessionDetailComponent {

  public id : number
  public oSaleSession : SaleSession
  public tSale : Sale[]
  public isEditing: boolean = false;
  public editDate: Date;
  public editReference: string;

  constructor(
    private _router : Router,
    private _toast : ToastService,
    private _activatedRoute : ActivatedRoute,
    private _saleService : SaleService,
    private _bcService  : BreadcrumbService
  ) {
    this.init().then(()=> {
      this._bcService.setBreadCrumb([
        {
          label : 'Ventes',
          link : 'sales'
        },
        {
          label : `Session du ${new Date(this.oSaleSession.creationDate).toLocaleDateString()}`,
          link : 'sales'
        }
      ])
    })
  }

  public async init () : Promise<void> {
    const idString = this._activatedRoute.snapshot.params['id']
    if(!idString){
      this._toast.displayToast('error')
      return
    }
    this.id = Number(idString)
    this.oSaleSession = await this._saleService.getSaleSession(this.id)
    this.oSaleSession.tSale.forEach((sale) => {
      sale.displayTablePayment = sale.tPayment.map(obj => obj.oPaymentMethod.label).join(', ')
      sale.displayTableRef = sale.tSaleLine.map((obj) => obj.oArticle?.referenceCode ?? '').join(', ')
      sale.displayTableRefLabel = sale.tSaleLine.map((obj) => obj.oArticle?.label ?? '').join(', ')
    })
  }

  public goToSaleDetail(id : number) :void {
    this._router.navigateByUrl(`private/sales/${this.oSaleSession.id}/sale/${id}`)
  }

  public async closeSession() : Promise<void> {
    this._saleService.closeSession(this.id).then(()=> {
      this._router.navigateByUrl('private/sales')
    })
  }

  public getTotalAmount(): number {
    return this.oSaleSession.tSale?.reduce((total, sale) => total + sale.totalAmount, 0) || 0;
  }

  public getTotalCB(): number {
    const tPaymentFiltered = []
    for(const sale of this.oSaleSession.tSale){
      tPaymentFiltered.push(... sale.tPayment?.filter((obj)=> obj.paymentMethodId === PaymentMethodEnum.CB) ?? [])
    }
    return tPaymentFiltered.reduce((total, sale) => total + sale.amount, 0) || 0;
  }
  public getTotalCashCheck(): number {
    const tPaymentFiltered = []
    for(const sale of this.oSaleSession.tSale){
      tPaymentFiltered.push(... sale.tPayment?.filter((obj)=> obj.paymentMethodId === PaymentMethodEnum.ESPECE || obj.paymentMethodId === PaymentMethodEnum.CHEQUE) ?? [])
    }
    return tPaymentFiltered.reduce((total, sale) => total + sale.amount, 0) || 0;
  }

  public startEditing(): void {
    this.isEditing = true;
    this.editDate = new Date(this.oSaleSession.creationDate);
    this.editReference = this.oSaleSession.saleSessionReference || '';
  }

  public cancelEditing(): void {
    this.isEditing = false;
    this.editDate = null;
    this.editReference = null;
  }

  public async saveChanges(): Promise<void> {
    try {
      const updatedSession = await this._saleService.updateSaleSession(this.id, {
        creationDate: this.editDate,
        saleSessionReference: this.editReference
      });

      this.oSaleSession = {
        ...this.oSaleSession,
        creationDate: updatedSession.creationDate,
        saleSessionReference: updatedSession.saleSessionReference
      };

      this.isEditing = false;
      this._toast.displayToast('sucess', 'Session de vente mise à jour avec succès');
    } catch (error) {
      this._toast.displayToast('error', 'Erreur lors de la mise à jour de la session');
    }
  }
}
