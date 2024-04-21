import { Component } from '@angular/core';
import { MovementType } from '../../../../@models/entities/MovementType.interface';
import { MovementTypeService } from '../../../../core/services/movement-type.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-movement-type-list',
  templateUrl: './movement-type-list.component.html',
  styleUrl: './movement-type-list.component.scss'
})
export class MovementTypeListComponent {

  public tMovementType : MovementType[] = []

  constructor(
    private _movementTypeService : MovementTypeService,
    private _router : Router,
    private _breadcrumbService : BreadcrumbService
  ){
    this._movementTypeService.list().then((tMovementType) => this.tMovementType = tMovementType)
    this._breadcrumbService.setBreadCrumb(
      [
        {
          label : 'Administration',
          link : 'administration'
        },
        {
          label : 'Types de mouvements de stocks',
          link : 'administration/movement-type'
        }
      ]
    )
  }

  public goToMovementTypeDetail (id : number) : void {
    this._router.navigateByUrl(`private/administration/movement-type/${id}`)
  }



}
