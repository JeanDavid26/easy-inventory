import { Component, OnInit } from '@angular/core';
import { Icons } from '../../../../shared/icons';
import { InventoryService } from '../../../../core/services/inventory.service';
import { DocumentService } from '../../../../core/services/document.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { InventorySales } from '../../../../@models/interfaces/inventory-sales.interface';

type QuickPeriod = 'lastMonth' | 'month' | 'year'

// Historique des ventes d'un stock sur une période, avec export PDF (relevé pour les dépôts)
@Component({
  selector: 'app-inventory-sales',
  templateUrl: './inventory-sales.component.html'
})
export class InventorySalesComponent implements OnInit {
  readonly icons = Icons

  inventoryId: number
  // Dates au format yyyy-MM-dd (champs date natifs)
  fromDate: string
  toDate: string
  activeQuickPeriod: QuickPeriod | null = 'lastMonth'
  readonly tQuickPeriod: { value: QuickPeriod, label: string }[] = [
    { value: 'lastMonth', label: 'Mois dernier' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' },
  ]

  oSales: InventorySales | null = null
  isGeneratingPdf = false

  constructor(
    private _inventoryService: InventoryService,
    private _documentService: DocumentService,
    private _toastService: ToastService
  ) {
    this.inventoryId = this._inventoryService.inventory.getValue()?.id
  }

  ngOnInit(): void {
    this.selectQuickPeriod('lastMonth')
  }

  public selectQuickPeriod(period: QuickPeriod): void {
    const now = new Date()
    let from: Date
    let to: Date
    switch (period) {
      case 'lastMonth':
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        to = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case 'month':
        from = new Date(now.getFullYear(), now.getMonth(), 1)
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case 'year':
        from = new Date(now.getFullYear(), 0, 1)
        to = new Date(now.getFullYear(), 11, 31)
        break
    }
    this.fromDate = this.toInputDate(from)
    this.toDate = this.toInputDate(to)
    this.activeQuickPeriod = period
    this.loadSales()
  }

  public onDateChange(): void {
    this.activeQuickPeriod = null
    this.loadSales()
  }

  public get isPeriodValid(): boolean {
    return !!this.fromDate && !!this.toDate && this.fromDate <= this.toDate
  }

  public async loadSales(): Promise<void> {
    if (!this.isPeriodValid) {
      this.oSales = null
      return
    }
    const { from, to } = this.getPeriod()
    this.oSales = await this._inventoryService.getSales(this.inventoryId, from, to)
  }

  public async downloadPdf(): Promise<void> {
    if (!this.isPeriodValid) {
      this._toastService.displayToast('error', 'Choisis une période valide.')
      return
    }
    this.isGeneratingPdf = true
    try {
      const { from, to } = this.getPeriod()
      const fileURL = await this._documentService.generateInventorySales(this.inventoryId, from, to)
      window.open(fileURL)
    } finally {
      this.isGeneratingPdf = false
    }
  }

  // Du début du premier jour à la fin du dernier jour, en heure locale
  private getPeriod(): { from: Date, to: Date } {
    const [ fy, fm, fd ] = this.fromDate.split('-').map(Number)
    const [ ty, tm, td ] = this.toDate.split('-').map(Number)
    return { from: new Date(fy, fm - 1, fd), to: new Date(ty, tm - 1, td, 23, 59, 59, 999) }
  }

  private toInputDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  }
}
