import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InventoryService } from '../../../../core/services/inventory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InventoryType } from '../../../../@models/entities/InventoryType.interface';
import { InventoryTypeService } from '../../../../core/services/inventory-type.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrl: './inventory-detail.component.scss'
})
export class InventoryDetailComponent {
  public id :number
  public inventory : Inventory
  public form : FormGroup
  public tInventoryType : InventoryType[]
  public linksData : {label : string, link : string[]}[]
  public activeLink : string
  constructor(
    private _activatedRoute : ActivatedRoute,
    private _inventoryService : InventoryService,
    private _fb : FormBuilder,
    private _router : Router,
    private _bcService : BreadcrumbService,
    private _inventoryTypeService : InventoryTypeService
  ){
    this.id = Number(this._activatedRoute.snapshot.params['id'])
    this._inventoryService.inventory.subscribe((inventory)=>{
      if(inventory){
        this.linksData = [
          { label : 'Stock', link : ['private','inventory', inventory.id.toString()  , 'content']},
          { label : 'Mouvement de stock', link : ['private','inventory', inventory.id.toString(), 'movement']},
          { label : 'Document', link : ['private','inventory', inventory.id.toString(), 'documents']}
        ]
        this.setActiveLink(this._router.url);
        this._router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.setActiveLink(this._router.url);
        });
        this.id = inventory.id

      } else {
        this.id = 0
      }
      this._bcService.setBreadCrumb([
        {
          label : 'Stock',
          link : 'inventory'
        },
        {
          label : `${this.id ? inventory.label : 'Nouveau stock'}`,
          link : `inventory/${this.id}`
        },
      ])
      this.initForm()
    })


  }

  public async initForm() {
    this.tInventoryType = await this._inventoryTypeService.list()
    const inventory = this._inventoryService.inventory.value
    this.form = this._fb.group({
      label : inventory?.label,
      inventoryTypeId : inventory?.inventoryTypeId
    })

  }
  public async enregistrer() : Promise<void> {
    const inventory = this.form.value
    await this._inventoryService.insert(inventory)
    this._router.navigateByUrl(`private/inventory/${this.id}/content`)
  }

  public navigate(linkTree: string[]): void {
    this._router.navigate(linkTree).then(() => {
      this.setActiveLink(this._router.url);
    });
  }

  private setActiveLink(url: string) {
    const currentRoute = this.linksData.find(linkData =>
      url.includes(linkData.link.join('/'))
    );
    if (currentRoute) {
      this.activeLink = currentRoute.label;
    }
  }
}
