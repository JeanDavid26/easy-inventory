import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { ProductsNavComponent } from './pages/products-nav/products-nav.component';



@NgModule({
  declarations: [
    ArticleDetailComponent,
    ArticleListComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    ProductsNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductsModule { }
