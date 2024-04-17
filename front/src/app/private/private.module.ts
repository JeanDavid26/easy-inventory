import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrivateRoutingModule } from './private-routing.module';
import { InventoryModule } from './inventory/inventory.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    InventoryModule,
    DashboardModule,
    ProductsModule,
    SharedModule
  ]
})
export class PrivateModule { }
