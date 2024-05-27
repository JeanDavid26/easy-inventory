import { Component } from '@angular/core';
import { PaiementMethodService } from '../../../../core/services/paiemen-method.service';
import { PaiementMethod } from '../../../../@models/entities/PaiementMethod.interface';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-paiement-method-list',
  templateUrl: './paiement-method-list.component.html',
  styleUrl: './paiement-method-list.component.scss'
})
export class PaiementMethodListComponent {

  public tPaiementMethod : PaiementMethod[] = []

  constructor(
    private _paiementMethodService : PaiementMethodService,
    private _router : Router,
    private _bcService : BreadcrumbService
  ){
    this._paiementMethodService.list().then((tPaiementMethod) => this.tPaiementMethod = tPaiementMethod)
    this._bcService.setBreadCrumb(
      [
        {
          label : 'Administration',
          link : 'administration'
        },
        {
          label : 'Modes de paiements',
          link : 'administration/paiemene-method'
        }
      ]
    )
  }

  public goToPaiementMethodDetail (id : number) : void {
    this._router.navigateByUrl(`private/administration/paiement-method/${id}`)
  }
}
