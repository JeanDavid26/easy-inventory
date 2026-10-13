import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ArticleService } from '../../../../core/services/article.service';
import { InventoryService } from '../../../../core/services/inventory.service';
import { CategoryService } from '../../../../core/services/category.service';
import { SaleService } from '../../../../core/services/sale.service';
import { InventoryMovementService } from '../../../../core/services/inventory-movement.service';
import { Router } from '@angular/router';
import Decimal from 'decimal.js';
import { EChartsOption } from 'echarts';
import { SaleStats } from '../../../../@models/interfaces/sale-stats.interface';

type StatsPeriod = 'week' | 'month' | 'year' | 'all'

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.scss'
})
export class DashboardDetailComponent {
  currentDate: Date = new Date();

  totalArticles: number = 0;
  totalInventory: number = 0;
  totalStockValue: number = 0;
  totalCategories: number = 0;
  lowStockArticles: any[] = [];
  recentMovements: any[] = [];
  salesChart: any;

  tPeriod: { value: StatsPeriod, label: string }[] = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' },
    { value: 'all', label: 'Tout' },
  ]
  selectedPeriod: StatsPeriod = 'month'
  tBestSeller: SaleStats['tBestSeller'] = []
  maxBestSellerQuantity: number = 0
  categoryChartOptions: EChartsOption | null = null
  readonly tMedalClass = ['bg-amber-400 text-white', 'bg-gray-400 text-white', 'bg-orange-600 text-white']

  constructor(
    private _bcService: BreadcrumbService,
    private articleService: ArticleService,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private saleService: SaleService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._bcService.setBreadCrumb([{label: 'Tableau de bord', link: '/dashboard'}]);
    this.loadDashboardData();
    this.loadSaleStats();
  }

  public selectPeriod(period: StatsPeriod) {
    this.selectedPeriod = period;
    this.loadSaleStats();
  }

  async loadSaleStats() {
    const { from, to } = this.getPeriodRange(this.selectedPeriod)
    const oStats = await this.saleService.getStats(from, to)

    this.tBestSeller = oStats.tBestSeller
    this.maxBestSellerQuantity = Math.max(0, ...oStats.tBestSeller.map((item) => item.quantity))
    this.categoryChartOptions = oStats.tCategory.length === 0 ? null : {
      tooltip: { trigger: 'item', formatter: '{b} : {c} ex. ({d}%)' },
      legend: { orient: 'vertical', right: 0, top: 'middle' },
      series: [{
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        label: { show: false },
        data: oStats.tCategory.map((category) => ({ name: category.label, value: category.quantity }))
      }]
    }
  }

  private getPeriodRange(period: StatsPeriod): { from?: Date, to?: Date } {
    const now = new Date()
    switch (period) {
      case 'week': {
        // Semaine commençant le lundi
        const from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7))
        return { from }
      }
      case 'month':
        return { from: new Date(now.getFullYear(), now.getMonth(), 1) }
      case 'year':
        return { from: new Date(now.getFullYear(), 0, 1) }
      default:
        return {}
    }
  }

  async loadDashboardData() {
    const [ inventoryList, categoryList] = await Promise.all([
      this.inventoryService.list(),
      this.categoryService.list(),
    ])

    this.totalInventory = inventoryList.length
    this.totalArticles = inventoryList.reduce((acc, curr) => new Decimal(acc).add(curr.quantity).toNumber(),0)
    this.totalCategories = categoryList.length
    this.totalStockValue = inventoryList.reduce((acc, curr) => new Decimal(acc).add(curr.value).toNumber(),0)
  }

  public async goToMovement(id: number) {
    const oMovement = this.recentMovements.find((movement: any) => movement.id === id);
    const oInventory = await this.inventoryService.get(oMovement.destinationInventoryId)
    this._router.navigateByUrl(`/private/inventory/${oInventory.id}/movement/${id}`)
  }
}
