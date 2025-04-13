import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrivateRoutingModule } from './private-routing.module';
import { InventoryModule } from './inventory/inventory.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';
import { AdministrationModule } from './administration/administration.module';
import { SalesModule } from './sales/sales.module';



@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    InventoryModule,
    ProductsModule,
    SharedModule,
    AdministrationModule,
    SalesModule
  ]
})
export class PrivateModule { }
