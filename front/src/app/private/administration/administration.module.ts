import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './pages/administration/administration.component';
import { InventoryTypeListComponent } from './pages/inventory-type-list/inventory-type-list.component';
import { InventoryTypeDetailComponent } from './pages/inventory-type-detail/inventory-type-detail.component';
import { MovementTypeListComponent } from './pages/movement-type-list/movement-type-list.component';
import { MovementTypeDetailComponent } from './pages/movement-type-detail/movement-type-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdministrationComponent,
    InventoryTypeListComponent,
    InventoryTypeDetailComponent,
    MovementTypeListComponent,
    MovementTypeDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdministrationModule { }
