import { Module } from '@nestjs/common';
import { InventoryController } from './inventory/inventory.controller';
import { SharedModule } from 'src/shared/shared.module';
import { InventoryService } from './inventory/inventory.service';
import { InventoryMovementController } from './inventory-movement/inventory-movement.controller';
import { InventoryMovementService } from './inventory-movement/inventory-movement.service';

@Module({
  controllers: [InventoryController, InventoryMovementController],
  imports: [SharedModule],
  providers: [InventoryService, InventoryMovementService],
})
export class InventoryModule {}
