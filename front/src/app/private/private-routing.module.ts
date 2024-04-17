import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CategoryListComponent } from './products/pages/category-list/category-list.component';
import { ArticleListComponent } from './products/pages/article-list/article-list.component';
import { InventoryListComponent } from './inventory/pages/inventory-list/inventory-list.component';
import { CategoryDetailComponent } from './products/pages/category-detail/category-detail.component';
import { ArticleDetailComponent } from './products/pages/article-detail/article-detail.component';
import { InventoryDetailComponent } from './inventory/pages/inventory-detail/inventory-detail.component';
import { InventoryContentComponent } from './inventory/components/inventory-content/inventory-content.component';
import { InventoryResolver } from './inventory/inventory.resolver';
import { DocumentsComponent } from './inventory/components/documents/documents.component';
import { ProductsNavComponent } from './products/pages/products-nav/products-nav.component';

const routes: Routes = [
  { path: '', component: NavBarComponent, children: [
    { path : 'dashboard', component : DashboardComponent },
    { path : 'products', component : ProductsNavComponent, children : [
      { path : 'category', component : CategoryListComponent },
      { path : 'category/:id', component : CategoryDetailComponent },
      { path : 'article', component : ArticleListComponent },
      { path : 'article/:id', component : ArticleDetailComponent},
    ]},
    { path : 'inventory', component : InventoryListComponent},
    { path : 'inventory/:id', component : InventoryDetailComponent, resolve :{ inventory : InventoryResolver}, children : [
      { path : 'content', component : InventoryContentComponent},
      { path : 'documents', component : DocumentsComponent }
    ] }
  ] }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PrivateRoutingModule { }
