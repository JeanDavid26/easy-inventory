import { Module } from '@nestjs/common';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [SharedModule],
})
export class SalesModule {}
