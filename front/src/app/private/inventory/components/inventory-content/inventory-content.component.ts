import { Component } from '@angular/core';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { InventoryService } from '../../../../core/services/inventory.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { filter, first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-content',
  templateUrl: './inventory-content.component.html',
  styleUrl: './inventory-content.component.scss'
})
export class InventoryContentComponent {
  public inventory : Inventory

  constructor(
    private _inventoryService : InventoryService,
    private _bcService : BreadcrumbService,
    private _router : Router
  ){

    this.inventory = this._inventoryService.inventory.value
    this._inventoryService.inventory.subscribe((inventory)=>{
      this.inventory = inventory
    })

    this._inventoryService.inventory.pipe(
      filter(value => value !== null),
      first()
    ).subscribe((inventory)=>{
      this._bcService.setBreadCrumb([
        {
          label : 'Gestion des stocks',
          link : 'inventory'
        },
        {
          label : `${inventory.id ? inventory.label : 'Nouveau stock'}`,
          link : `inventory/${this.inventory.id}/content`
        },
      ])
    })


  }

  public addMovementStock() : void {
    this._router.navigateByUrl(`private/inventory/${this.inventory?.id}/movement/0`)
  }
}
