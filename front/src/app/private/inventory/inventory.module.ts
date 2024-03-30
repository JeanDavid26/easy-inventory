import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryDetailComponent } from './pages/inventory-detail/inventory-detail.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { InventoryContentComponent } from './components/inventory-content/inventory-content.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { DocumentsComponent } from './components/documents/documents.component';



@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryDetailComponent,
    TransactionListComponent,
    InventoryContentComponent,
    TransactionDetailComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class InventoryModule { }
