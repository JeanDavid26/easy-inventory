import { Component } from '@angular/core';
import { InventoryType } from '../../../../@models/entities/InventoryType.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryTypeService } from '../../../../core/services/inventory-type.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-inventory-type-detail',
  templateUrl: './inventory-type-detail.component.html',
  styleUrl: './inventory-type-detail.component.scss'
})
export class InventoryTypeDetailComponent {

  public id :number
  public invenotryType : InventoryType = null
  public form : FormGroup

  constructor(
    private _bcService : BreadcrumbService,
    private _activatedRoute : ActivatedRoute,
    private _inventoryTypeService : InventoryTypeService,
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
          label : 'Types de stock',
          link : 'administration/inventory-type'
        },
        {
          label : `${this.id ? this.invenotryType.label : 'Nouveau type de stock'}`,
          link : 'administration/movement-type/'
        }
      ])
    })
  }

  public async initForm() {
    this.id = Number(this._activatedRoute.snapshot.params['id'])
    if(this.id){
      this.invenotryType = await this._inventoryTypeService.get(this.id)
    }

    this.form = this._fb.group({
      label : [this.invenotryType?.label, Validators.required],

    })
  }

  public async enregistrer () : Promise<void> {
    const inventoryType : InventoryType = {
      ...this.form.getRawValue()
    }
    if(!this.id){
      await this._inventoryTypeService.insert(inventoryType).then(()=> {
        this._toastService.displayToast('sucess')
        this._router.navigateByUrl('private/administration/inventory-type')
      })
    }else {
      await this._inventoryTypeService.update(this.id, inventoryType)
    }

  }

  softDelete() : void {
    this._inventoryTypeService.delete(this.id).then(()=> {
        this._router.navigateByUrl('private/administration/inventory-type')
    })
  }
}
