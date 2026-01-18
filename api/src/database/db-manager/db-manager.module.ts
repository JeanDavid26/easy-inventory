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
import { PaymentMethod } from '../entities/PaiementMethod.entity'
import { PaiementMethodManagerService } from './paiement-method-manager/paiement-method-manager.service'
import { SaleSession } from '../entities/SaleSession.entity'
import { Payment } from '../entities/Payment.entity'
import { SaleSessionManagerService } from './sale-session-manager/sale-session-manager.service'
import { PaymentManagerService } from './payment-manager/payment-manager.service'
import { UnpaidSale } from '../entities/UnpaidSale.entity'
import { UnpaidSaleManagerService } from './unpaid-sale-manager/unpaid-sale-manager.service'

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
      User,
      Document,
      InventoryType,
      MovementType,
      PaymentMethod,
      Payment,
      SaleSession,
      SaleLine,
      Sale,
      UnpaidSale
    ])
  ],
  providers: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    UserManagerService,
    DocumentManagerService,
    InventoryLineManagerService,
    InventoryMovementManagerService,
    MovementLineManagerService,
    MovementTypeManagerService,
    InventoryTypeManagerService,
    PaiementMethodManagerService,
    SaleManagerService,
    SaleLineManagerService,
    SaleSessionManagerService,
    PaymentManagerService,
    UnpaidSaleManagerService
  ],
  exports: [
    CategoryManagerService,
    ArticleManagerService,
    InventoryManagerService,
    UserManagerService,
    DocumentManagerService,
    SaleManagerService,
    SaleLineManagerService,
    InventoryLineManagerService,
    InventoryMovementManagerService,
    MovementLineManagerService,
    MovementTypeManagerService,
    InventoryTypeManagerService,
    PaiementMethodManagerService,
    SaleSessionManagerService,
    PaymentManagerService,
    UnpaidSaleManagerService
  ]
})
export class DbManagerModule {}
