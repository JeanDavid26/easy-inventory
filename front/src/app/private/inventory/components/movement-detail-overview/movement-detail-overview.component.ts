import { Component } from '@angular/core';
import { InventoryMovement } from '../../../../@models/entities/InventoryMovement.interface';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { InventoryService } from '../../../../core/services/inventory.service';

@Component({
  selector: 'app-movement-detail-overview',
  templateUrl: './movement-detail-overview.component.html',
  styleUrl: './movement-detail-overview.component.scss'
})
export class MovementDetailOverviewComponent {

  public id : number
  public inventoryMovement : InventoryMovement
  public inventory : Inventory
  constructor(
    private _inventoryMovementService : InventoryMovementService,
    private _inventoryService : InventoryService,
    private _bcService : BreadcrumbService,
    private _router: Router,
    private _activatedRoute : ActivatedRoute
  ){

    this.initData().then(()=> {
      this._bcService.setBreadCrumb([
        {
          label : 'Stock',
          link : 'inventory'
        },
        {
          label : `${this.inventory.id ? this.inventory.label : 'Nouveau stock'}`,
          link : `inventory/${this.inventory.id}/content`
        },
        {
          label : `Mouvements de stock`,
          link : `inventory/${this.inventory.id}/movement`
        },
        {
          label : `${this.inventoryMovement.reference}`,
          link : `inventory/${this.inventory.id}/movement/${this.inventoryMovement.id}`
        },
      ])
    })


  }

  public async initData() {
    this.id = Number(this._activatedRoute.snapshot.params['idMovement'])
    if(this.id){
      this.inventoryMovement = await this._inventoryMovementService.get(this.id)
    }
    this.inventory = this._inventoryService.inventory.value
  }


}
