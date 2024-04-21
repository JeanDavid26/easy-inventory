import { Component } from '@angular/core';
import { InventoryType } from '../../../../@models/entities/InventoryType.interface';
import { InventoryTypeService } from '../../../../core/services/inventory-type.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-inventory-type-list',
  templateUrl: './inventory-type-list.component.html',
  styleUrl: './inventory-type-list.component.scss'
})
export class InventoryTypeListComponent {
  public tInventoryType : InventoryType[] = []

  constructor(
    private _InventoryTypeService : InventoryTypeService,
    private _router : Router,
    private _bcService : BreadcrumbService
  ){
    this._InventoryTypeService.list().then((tInventoryType) => this.tInventoryType = tInventoryType)
    this._bcService.setBreadCrumb(
      [
        {
          label : 'Administration',
          link : 'administration'
        },
        {
          label : 'Types de stock',
          link : 'administration/inventory-type'
        }
      ]
    )
  }

  public goToInventoryTypeDetail (id : number) : void {
    this._router.navigateByUrl(`private/administration/inventory-type/${id}`)
  }
}
