import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../core/services/inventory.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';
import { InventoryMovement } from '../../../../@models/entities/InventoryMovement.interface';
import { Subscription } from 'rxjs';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.scss'
})
export class MovementListComponent implements OnInit {
  public oInventory : Inventory
  public toInventoryMovement : InventoryMovement[] = []
  public tSubsciption : Subscription[] = []
  public filteredMovements: InventoryMovement[] = [];
  public searchForm: FormGroup;
  public sortColumn: string | null = null;
  public sortDirection: 'asc' | 'desc' | null = null;

  constructor(
    private _inventoryService : InventoryService,
    private _inventoryMovementService : InventoryMovementService,
    private _bcService : BreadcrumbService,
    private _router : Router,
    private _fb: FormBuilder
  ){
    this.oInventory = this._inventoryService.inventory.value
    this._inventoryService.inventory.subscribe((inventory)=> {
      this.oInventory = inventory
      if(this.oInventory){
        this._inventoryMovementService.listByInventoryId(this.oInventory.id).then((toInventoryMovement)=> {
          this.toInventoryMovement = toInventoryMovement
          this.filteredMovements = toInventoryMovement
        })
      }
    })



    this.searchForm = this._fb.group({
      searchTerm: [null]
    });
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterMovements();
      });
  }

  private filterMovements(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase();
    if (!searchTerm) {
      this.filteredMovements = [...this.toInventoryMovement];
    } else {
      this.filteredMovements = this.toInventoryMovement.filter(movement =>
        movement.reference?.toLowerCase().includes(searchTerm) ||
        movement.oMovementType.label?.toLowerCase().includes(searchTerm) ||
        movement.oDestinationInventory?.label?.toLowerCase().includes(searchTerm)
      );
    }
  }

  public sortMovements(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? null : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection === null) {
      this.sortColumn = null;
      this.filteredMovements = [...this.toInventoryMovement];
    } else {
      this.filteredMovements.sort((a, b) => {
        const valueA = this.getValueForSort(a, column);
        const valueB = this.getValueForSort(b, column);
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  private getValueForSort(movement: InventoryMovement, column: string): any {
    switch (column) {
      case 'reference': return movement.reference;
      case 'movementType': return movement.oMovementType.label;
      case 'destination': return movement.oDestinationInventory?.label || '';
      default: return '';
    }
  }

  goToMovementDetail(id : number) : void {
    this._router.navigateByUrl(`private/inventory/${this.oInventory.id}/movement/${id}`)
  }
}
