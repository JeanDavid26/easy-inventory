import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { SaleOverviewComponent } from './pages/sale-overview/sale-overview.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';



@NgModule({
  declarations: [
    SaleListComponent,
    SaleOverviewComponent,
    SaleDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SalesModule { }
