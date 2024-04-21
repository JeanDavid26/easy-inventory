import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../core/services/inventory.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';
import { InventoryMovement } from '../../../../@models/entities/InventoryMovement.interface';
import { Subscription } from 'rxjs';
import { Inventory } from '../../../../@models/entities/Inventory.interface';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.scss'
})
export class MovementListComponent implements OnInit {
  public oInventory : Inventory
  public toInventoryMovement : InventoryMovement[] = []
  public tSubsciption : Subscription[] = []

  constructor(
    private _inventoryService : InventoryService,
    private _inventoryMovementService : InventoryMovementService,
    private _bcService : BreadcrumbService,
    private _router : Router
  ){
    this.oInventory = this._inventoryService.inventory.value
    this._inventoryService.inventory.subscribe((inventory)=> {
      this.oInventory = inventory
    })

    if(this.oInventory){
      this._inventoryMovementService.listByInventoryId(this.oInventory.id).then((toInventoryMovement)=> {
        this.toInventoryMovement = toInventoryMovement
      })
    }
  }

  ngOnInit(): void {

  }

  goToMovementDetail(id : number) : void {
    this._router.navigateByUrl(`private/inventory/${this.oInventory.id}/movement/${id}`)
  }
}
