import { Module } from '@nestjs/common';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';
import { SharedModule } from 'src/shared/shared.module';
import { UnpaidController } from './unpaid/unpaid.controller';
import { UnpaidService } from './unpaid/unpaid.service';

@Module({
  controllers: [SaleController, UnpaidController],
  providers: [SaleService, UnpaidService],
  imports: [SharedModule],
})
export class SalesModule {}
