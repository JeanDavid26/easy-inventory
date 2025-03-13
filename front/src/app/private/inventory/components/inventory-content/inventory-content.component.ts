import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { InventoryService } from '../../../../core/services/inventory.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { filter, first } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../@models/entities/Category.interface';
import { InventoryLine } from '../../../../@models/entities/InventoryLine.interface';
import { InventoryLineService } from '../../../../core/services/inventory-line.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-inventory-content',
  templateUrl: './inventory-content.component.html',
  styleUrl: './inventory-content.component.scss',
})
export class InventoryContentComponent implements OnInit {
  public inventory: Inventory;
  public tInventoryLine: InventoryLine[] = [];
  public filteredInventoryLines: InventoryLine[] = [];
  public searchForm: FormGroup;
  public sortColumn: string | null = null;
  public sortDirection: 'asc' | 'desc' | null = null;
  public categories: Category[] = [];
  public editingRow: { [key: number]: boolean } = {};
  public editQuantityControl: FormControl = new FormControl();
  private originalQuantity: number;

  constructor(
    private _inventoryService: InventoryService,
    private _inventoryLineService: InventoryLineService,
    private _bcService: BreadcrumbService,
    private _toastService: ToastService,
    private _router: Router,
    private _fb: FormBuilder,
    private _categoryService: CategoryService
  ) {
    this.inventory = this._inventoryService.inventory.value;
    this._inventoryService.inventory.subscribe((inventory) => {
      this.inventory = inventory;
    });

    this.searchForm = this._fb.group({
      searchTerm: [null],
      categoryFilter: [''],
    });
  }

  ngOnInit(): void {
    this._loadTInventoryLine();
    this.setupSearch();
    this.setupCategoryFilter();
    this.filterInventoryLines();
    this.loadCategories();
  }

  private async _loadTInventoryLine(): Promise<void> {
    if (this.inventory.id) {
      const tInventoryLine = await this._inventoryLineService.listByInventoryId(
        this.inventory.id
      );
      this.tInventoryLine = tInventoryLine;
      this.filterInventoryLines();
    }
  }

  private setupSearch(): void {
    this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterInventoryLines();
      });
  }

  private setupCategoryFilter(): void {
    this.searchForm
      .get('categoryFilter')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterInventoryLines();
      });
  }

  private async loadCategories(): Promise<void> {
    this.categories = await this._categoryService.list();
  }

  private filterInventoryLines(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase();
    const categoryFilter = this.searchForm.get('categoryFilter')?.value;

    this.filteredInventoryLines = this.tInventoryLine.filter((line) => {
      const matchesSearch =
        !searchTerm ||
        line.oArticle.referenceCode.toLowerCase().includes(searchTerm) ||
        line.oArticle.label.toLowerCase().includes(searchTerm) ||
        line.oArticle.oCategory.label.toLowerCase().includes(searchTerm);

      const matchesCategory =
        !categoryFilter || line.oArticle.oCategory.id === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    if (this.sortColumn) {
      this.sortInventoryLines(this.sortColumn);
    }
  }

  public sortInventoryLines(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : this.sortDirection === 'desc'
          ? null
          : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection === null) {
      this.sortColumn = null;
      this.filteredInventoryLines = [...this.tInventoryLine];
    } else {
      this.filteredInventoryLines.sort((a, b) => {
        const valueA = this.getValueForSort(a, column);
        const valueB = this.getValueForSort(b, column);
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  private getValueForSort(line: any, column: string): any {
    switch (column) {
      case 'referenceCode':
        return line.oArticle.referenceCode;
      case 'label':
        return line.oArticle.label;
      case 'category':
        return line.oArticle.oCategory.label;
      case 'quantity':
        return line.quantity;
      case 'value':
        return line.oArticle.unitPrice * line.quantity;
      default:
        return '';
    }
  }

  public addMovementStock(): void {
    this._router.navigateByUrl(
      `private/inventory/${this.inventory?.id}/movement/0`
    );
  }

  public async supprimerInventoryLine(id: number): Promise<void> {
    await this._inventoryLineService.deleteInventoryLine(id);

    await this._loadTInventoryLine();
  }

  public startEditing(inventoryLine: InventoryLine): void {
    this.editingRow = {}; // Réinitialise pour n'éditer qu'une ligne à la fois
    this.editingRow[inventoryLine.id] = true;
    this.editQuantityControl.setValue(inventoryLine.quantity);
    this.originalQuantity = inventoryLine.quantity;
  }

  public cancelEditing(): void {
    this.editingRow = {};
    this.editQuantityControl.setValue(null);
  }

  public async saveQuantity(inventoryLineId: number): Promise<void> {
    try {
      const newQuantity = this.editQuantityControl.value;
      if (newQuantity === this.originalQuantity) {
        this.cancelEditing();
        return;
      }

      await this._inventoryLineService.updateInventoryLine(inventoryLineId, {
        quantity: newQuantity
      });

      await this._loadTInventoryLine();
      this.cancelEditing();
      // Optionnel : ajouter un message de succès
      this._toastService.displayToast('sucess', 'Quantité mise à jour avec succès');
    } catch (error) {
      // Gérer l'erreur et afficher un message
      console.error('Erreur lors de la mise à jour de la quantité:', error);
    }
  }
}
