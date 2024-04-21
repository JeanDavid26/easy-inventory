import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { MovementType } from '../../../../@models/entities/MovementType.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MovementTypeService } from '../../../../core/services/movement-type.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-movement-type-detail',
  templateUrl: './movement-type-detail.component.html',
  styleUrl: './movement-type-detail.component.scss'
})
export class MovementTypeDetailComponent {

  public id :number
  public movementType : MovementType = null
  public form : FormGroup

  constructor(
    private _bcService : BreadcrumbService,
    private _activatedRoute : ActivatedRoute,
    private _movementTypeService : MovementTypeService,
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
          label : 'Types de mouvements de stocks',
          link : 'administration/movement-type'
        },
        {
          label : `${this.id ? this.movementType.label : 'Nouveau type de mouvement de stock'}`,
          link : 'administration/movement-type/'
        }
      ])
    })
  }

  public async initForm() {
    this.id = Number(this._activatedRoute.snapshot.params['id'])
    if(this.id){
      this.movementType = await this._movementTypeService.get(this.id)
    }

    this.form = this._fb.group({
      label : [this.movementType?.label, Validators.required],

    })
  }

  public async enregistrer () : Promise<void> {
    const movementType : MovementType = {
      ...this.form.getRawValue()
    }
    if(!this.id){
      await this._movementTypeService.insert(movementType).then(()=> {
        this._toastService.displayToast('sucess')
        this._router.navigateByUrl('private/administration/movement-type')
      })
    }else {
      await this._movementTypeService.update(this.id, movementType)
    }

  }

  softDelete() : void {
    this._movementTypeService.delete(this.id).then(()=> {
        this._router.navigateByUrl('private/administration/movement-type')
    })
  }
}
