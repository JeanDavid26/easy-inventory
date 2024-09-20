import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { Chart, registerables } from 'chart.js'; // Modifié
import { ArticleService } from '../../../core/services/article.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { CategoryService } from '../../../core/services/category.service';
import { SaleService } from '../../../core/services/sale.service';
import { InventoryMovementService } from '../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';

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
  chartOptions: EChartsOption;

  constructor(
    private _bcService: BreadcrumbService,
    private articleService: ArticleService,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private saleService: SaleService,
    private inventoryMovementService: InventoryMovementService,
    private _router: Router
  ) {

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

  createSalesChart(salesData: number[]) {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the weeks of the current month (as strings)
    const weeks = this.getWeeksOfCurrentMonth(currentYear, currentMonth);


    // Define chart options with weeks as the x-axis data
    this.chartOptions = {
      title: {
        text: 'Ventes du mois'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: weeks
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} €'  // Add the euro symbol here
        },

      },
      series: [{
        name: 'Ventes €',
        type: 'bar',
        data: salesData
      }]
    };
  }

   // Function to calculate the 4 weeks of the current month
   getWeeksOfCurrentMonth(year: number, month: number): string[] {
    const weeks = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    let startDate = 1;

    while (startDate <= daysInMonth) {
      const weekEnd = Math.min(startDate + 6, daysInMonth);
      weeks.push(`Semaine: ${startDate}-${weekEnd}`);
      startDate += 7;
    }

    // If more than 4 weeks, return the last 4 weeks only
    return weeks.slice(-4);
  }

  public async goToMovement(id: number) {
    const oMovement = this.recentMovements.find((movement: any) => movement.id === id);
    const oInventory = await this.inventoryService.get(oMovement.destinationInventoryId)
    this._router.navigateByUrl(`/private/inventory/${oInventory.id}/movement/${id}`)
  }
}
