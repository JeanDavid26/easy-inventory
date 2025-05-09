import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { SaleSessionDetailComponent } from './pages/sale-session-detail/sale-session-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SaleListComponent,
    SaleDetailComponent,
    SaleSessionDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class SalesModule { }
