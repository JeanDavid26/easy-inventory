import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryDetailComponent } from './pages/inventory-detail/inventory-detail.component';
import { InventoryContentComponent } from './components/inventory-content/inventory-content.component';
import { DocumentsComponent } from './components/documents/documents.component';
@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent,
    InventoryContentComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class InventoryModule { }
