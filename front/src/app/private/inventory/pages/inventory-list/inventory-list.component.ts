import { Component } from '@angular/core';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { InventoryService } from '../../../../core/services/inventory.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { DocumentService } from '../../../../core/services/document.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {

  public tInventory : Inventory[] = []


  constructor(
    private _inventoryService : InventoryService,
    private _router : Router,
    private _fb : FormBuilder,
    private _bcService : BreadcrumbService,
    private _documentService : DocumentService
  ){
    this._bcService.setBreadCrumb([
      {
        label : 'Gestion des stocks',
        link : 'inventory'
      }
    ])
    this.initList()
  }

  public async initList() : Promise<void>{
   this.tInventory =  await this._inventoryService.list()
  }

  public goToInventoryDetail(id : number) : void{
    this._router.navigateByUrl(`private/inventory/${id}/content`)
  }

  public async generateAllInventoriesState() : Promise<void> {
    try {
      const result = await this._documentService.generateAllInventoriesState()
      window.open(result.fileURL)
    } catch (error) {
      console.error('Erreur lors de la génération du PDF tous stocks:', error)
    }
  }

}
