import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryDetailComponent } from './pages/inventory-detail/inventory-detail.component';
import { InventoryContentComponent } from './components/inventory-content/inventory-content.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { MovementListComponent } from './components/movement-list/movement-list.component';
import { MovementDetailComponent } from './components/movement-detail/movement-detail.component';
import { MovementDetailOverviewComponent } from './components/movement-detail-overview/movement-detail-overview.component';
import { SettingsComponent } from './components/settings/settings.component';
@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent,
    InventoryContentComponent,
    DocumentsComponent,
    MovementListComponent,
    MovementDetailComponent,
    MovementDetailOverviewComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class InventoryModule {}
