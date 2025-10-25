import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ArticleService } from '../../../../core/services/article.service';
import { InventoryService } from '../../../../core/services/inventory.service';
import { CategoryService } from '../../../../core/services/category.service';
import { SaleService } from '../../../../core/services/sale.service';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent {

  totalArticles: number = 0;
  totalInventory: number = 0;
  totalStockValue: number = 0;
  totalCategories: number = 0;
  lowStockArticles: any[] = [];
  recentMovements: any[] = [];
  salesChart: any;

  constructor(
    private _bcService: BreadcrumbService,
    private articleService: ArticleService,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._bcService.setBreadCrumb([{label: 'Tableau de bord', link: '/dashboard'}]);
    this.loadDashboardData();
  }

  async loadDashboardData() {
    const [articleList, inventoryList, categoryList] = await Promise.all([
      this.articleService.list(),
      this.inventoryService.list(),
      this.categoryService.list(),
    ])

    this.totalInventory = inventoryList.length
    this.totalArticles = articleList.length
    this.totalCategories = categoryList.length
    this.totalStockValue = inventoryList.reduce((acc, curr) => new Decimal(acc).add(curr.value).toNumber(),0)
  }

  public async goToMovement(id: number) {
    const oMovement = this.recentMovements.find((movement: any) => movement.id === id);
    const oInventory = await this.inventoryService.get(oMovement.destinationInventoryId)
    this._router.navigateByUrl(`/private/inventory/${oInventory.id}/movement/${id}`)
  }
}
