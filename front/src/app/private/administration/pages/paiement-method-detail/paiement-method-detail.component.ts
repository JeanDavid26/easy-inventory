import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementMethod } from '../../../../@models/entities/PaiementMethod.interface';
import { PaiementMethodService } from '../../../../core/services/paiemen-method.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-paiement-method-detail',
  templateUrl: './paiement-method-detail.component.html',
  styleUrl: './paiement-method-detail.component.scss'
})
export class PaiementMethodDetailComponent {

  public id :number
  public paiementMethod : PaiementMethod = null
  public form : FormGroup

  constructor(
    private _bcService : BreadcrumbService,
    private _activatedRoute : ActivatedRoute,
    private _paiementMethodService : PaiementMethodService,
    private _fb : FormBuilder,
    private _router : Router,
    private _toastService : ToastService
  ){

    this.initForm().then(()=> {
      this._bcService.setBreadCrumb([
        {
          label : 'Administration',
          link : 'administration'
        },
        {
          label : 'Modes de paiements',
          link : 'administration/paiement-method'
        },
        {
          label : `${this.id ? this.paiementMethod.label : 'Nouveau type de stock'}`,
          link : 'administration/movement-type/'
        }
      ])
    })
  }

  public async initForm() {
    this.id = Number(this._activatedRoute.snapshot.params['id'])
    if(this.id){
      this.paiementMethod = await this._paiementMethodService.get(this.id)
    }

    this.form = this._fb.group({
      label : [this.paiementMethod?.label, Validators.required],

    })
  }

  public async enregistrer () : Promise<void> {
    const paiementMethod : PaiementMethod = {
      ...this.form.getRawValue()
    }
    if(!this.id){
      await this._paiementMethodService.insert(paiementMethod).then(()=> {
        this._toastService.displayToast('sucess')
        this._router.navigateByUrl('private/administration/paiement-method')
      })
    }else {
      await this._paiementMethodService.update(this.id, paiementMethod)
    }

  }

  softDelete() : void {
    this._paiementMethodService.delete(this.id).then(()=> {
        this._router.navigateByUrl('private/administration/paiement-method')
    })
  }
}
