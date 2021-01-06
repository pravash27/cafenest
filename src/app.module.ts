import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './product-category/product-category.module';
import { UnitModule } from './unit/unit.module';
import { TableModule } from './table/table.module';
import { ProductModule } from './product/product.module';
import { BillingModule } from './billing/billing.module';
import { BillItemModule } from './bill-item/bill-item.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AdminModule, ProductCategoryModule, UnitModule, TableModule, ProductModule, BillingModule, BillItemModule, CustomerModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
