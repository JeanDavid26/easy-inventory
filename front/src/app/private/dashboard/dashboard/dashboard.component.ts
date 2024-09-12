import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { Chart, registerables } from 'chart.js'; // Modifié
import { ArticleService } from '../../../core/services/article.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { CategoryService } from '../../../core/services/category.service';
import { SaleService } from '../../../core/services/sale.service';
import { InventoryMovementService } from '../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalArticles: number = 0;
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
    private saleService: SaleService,
    private inventoryMovementService: InventoryMovementService,
    private _router: Router
  ) {
    Chart.register(...registerables); // Ajouté
  }

  ngOnInit() {
    this._bcService.setBreadCrumb([{label: 'Tableau de bord', link: '/dashboard'}]);
    this.loadDashboardData();
  }

  async loadDashboardData() {
    this.totalArticles = (await this.articleService.list()).length;
    this.totalStockValue = (await this.inventoryService.list()).reduce((acc, curr) => acc + curr.value, 0);
    this.totalCategories = (await this.categoryService.list()).length;
    this.lowStockArticles = []
    this.recentMovements = await this.inventoryMovementService.getRecentMovements()

    const salesData : any = await this.saleService.getRecentSales()
    this.createSalesChart(salesData);
  }

  createSalesChart(salesData: any) {
    console.log(salesData);

    this.salesChart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: salesData.map((sale: any) => sale.creationDate),
        datasets: [{
          label: 'Ventes',
          data: salesData.map((sale: any) => sale.totalPrice),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            type: 'linear' // Ajouté
          }
        }
      }
    });
  }

  public async goToMovement(id: number) {
    const oMovement = this.recentMovements.find((movement: any) => movement.id === id);
    console.log(oMovement);
    const oInventory = await this.inventoryService.get(oMovement.destinationInventoryId)
    this._router.navigateByUrl(`/private/inventory/${oInventory.id}/movement/${id}`)
  }
}
