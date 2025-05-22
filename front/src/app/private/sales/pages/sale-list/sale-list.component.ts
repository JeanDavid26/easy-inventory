import { Component } from '@angular/core';
import { SaleSession } from '../../../../@models/entities/SaleSession.interface';
import { SaleService } from '../../../../core/services/sale.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss'
})
export class SaleListComponent {

  public tSaleSession : SaleSession[] = []

  constructor (
    private _saleService  : SaleService,
    private _bcService : BreadcrumbService,
    private _router : Router,
    private _toast : ToastService
  ) {
    this._bcService.setBreadCrumb([
      {
        label : 'Sessions de ventes',
        link : 'sales'
      }
    ])
    this.getSaleSessions()
  }

  public async getSaleSessions() : Promise<void> {
    this.tSaleSession = await this._saleService.listSaleSession()
    this.tSaleSession.forEach((saleSession) => {
      saleSession.creationDate = new Date(saleSession.creationDate)
    })
  }

  public async  openSession() : Promise<void> {
    const session = await this._saleService.openSession()
    this.goToSaleSession(session.id)
  }



  public goToSaleSession(id : number) : void {
    this._router.navigateByUrl(`private/sales/${id}`)
  }

  public async deleteSession(id:number, event:Event): Promise<void> {
    event.stopPropagation()
    try {
      await this._saleService.deleteSession(id);
      await this.getSaleSessions()
      this._toast.displayToast('sucess', 'Session de vente supprimée avec succès');
      this._router.navigateByUrl('private/sales');
    } catch (error) {
      this._toast.displayToast('error', 'Erreur lors de la suppression de la session');
    }
}

}
