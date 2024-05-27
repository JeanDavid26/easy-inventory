import { Module } from '@nestjs/common'
import { CategoryManagerService } from './category-manager/category-manager.service'
import { ArticleManagerService } from './article-manager/article-manager.service'
import { InventoryManagerService } from './inventory-manager/inventory-manager.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import datasource from 'ormconfig'
import { Article } from '../entities/Article.entity'
import { Category } from '../entities/Category.entity'
import { Inventory } from '../entities/Inventory.entity'
import { UserManagerService } from './user-manager/user-manager.service'
import { User } from '../entities/User.entity'
import { AppFileManagerService } from './app-file-manager/app-file-manager.service'
import { AppFile } from '../entities/AppFile.entity'
import { DocumentManagerService } from './document-manager/document-manager.service'
import { Document } from '../entities/Document.entity'
import { InventoryLine } from '../entities/InventoryLine.entity'
import { MovementLine } from '../entities/MovementLine.entity'
import { InventoryMovement } from '../entities/InventoryMovement.entity'
import { Sale } from '../entities/Sale.entity'
import { SaleLine } from '../entities/SaleLine.entity'
import { SaleManagerService } from './sale-manager/sale-manager.service'
import { SaleLineManagerService } from './sale-line-manager/sale-line-manager.service'
import { InventoryLineManagerService } from './inventory-line-manager/inventory-line-manager.service'
import { InventoryMovementManagerService } from './inventory-movement-manager/inventory-movement-manager.service'
import { MovementLineManagerService } from './movement-line-manager/movement-line-manager.service'
import { InventoryType } from '../entities/InventoryType.entity'
import { MovementType } from '../entities/MovementType.entity'
import { MovementTypeManagerService } from './movement-type-manager/movement-type-manager.service'
import { InventoryTypeManagerService } from './inventory-type-manager/inventory-type-manager.service'
import { PaiementMethod } from '../entities/PaiementMethod.entity'
import { PaiementMethodManagerService } from './paiement-method-manager/paiement-method-manager.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await datasource.initialize()
        return datasource.options // Here we return the DataSourceOptions
      }
    }),
    TypeOrmModule.forFeature([
      Article,
      Category,
      Inventory,
      InventoryLine,
      InventoryMovement,
      MovementLine,
      Sale,
      SaleLine,
      User,
      AppFile,
      Document,
      InventoryType,
      MovementType,
      PaiementMethod
    ])
  ],
  providers: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    UserManagerService,
    AppFileManagerService,
    DocumentManagerService,
    SaleManagerService,
    SaleLineManagerService,
    InventoryLineManagerService,
    InventoryMovementManagerService,
    MovementLineManagerService,
    MovementTypeManagerService,
    InventoryTypeManagerService,
    PaiementMethodManagerService
  ],
  exports: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    UserManagerService,
    AppFileManagerService,
    DocumentManagerService,
    SaleManagerService,
    SaleLineManagerService,
    InventoryLineManagerService,
    InventoryMovementManagerService,
    MovementLineManagerService,
    MovementTypeManagerService,
    InventoryTypeManagerService,
    PaiementMethodManagerService

  ]
})
export class DbManagerModule {}
