import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillItemEntity } from 'src/bill-item/bill-item.entity';
import { BillItemService } from 'src/bill-item/bill-item.service';
import { CustomerEntity } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { PaymentEntity } from 'src/payment/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { BillingController } from './billing.controller';
import { BillingEntity } from './billing.entity';
import { BillingService } from './billing.service';

@Module({
  imports:[TypeOrmModule.forFeature([BillingEntity,BillItemEntity,CustomerEntity,PaymentEntity])],
  controllers: [BillingController],
  providers: [BillingService,BillItemService,CustomerService,PaymentService]
})
export class BillingModule {}
