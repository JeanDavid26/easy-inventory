import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    InventoryModule,
    UserModule,
    DocumentModule,
    SalesModule,
  ],
})
export class BusinessModule {}
