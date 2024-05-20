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
import { AdministrationComponent } from './administration/pages/administration/administration.component';
import { MovementTypeListComponent } from './administration/pages/movement-type-list/movement-type-list.component';
import { MovementTypeDetailComponent } from './administration/pages/movement-type-detail/movement-type-detail.component';
import { InventoryTypeListComponent } from './administration/pages/inventory-type-list/inventory-type-list.component';
import { InventoryTypeDetailComponent } from './administration/pages/inventory-type-detail/inventory-type-detail.component';
import { MovementListComponent } from './inventory/components/movement-list/movement-list.component';
import { MovementDetailComponent } from './inventory/components/movement-detail/movement-detail.component';
import { MovementDetailOverviewComponent } from './inventory/components/movement-detail-overview/movement-detail-overview.component';

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
      { path : 'movement', component : MovementListComponent},
      { path : 'movement/0', component : MovementDetailComponent},
      { path : 'movement/:idMovement', component : MovementDetailOverviewComponent},
      { path : 'documents', component : DocumentsComponent }
    ] },
    { path : 'administration', component : AdministrationComponent},
    { path : 'administration/movement-type', component : MovementTypeListComponent},
    { path : 'administration/movement-type/:id', component : MovementTypeDetailComponent},
    { path : 'administration/inventory-type', component : InventoryTypeListComponent},
    { path : 'administration/inventory-type/:id', component : InventoryTypeDetailComponent},
  ] }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PrivateRoutingModule { }
