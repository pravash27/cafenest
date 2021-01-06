import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillItemController } from './bill-item.controller';
import { BillItemEntity } from './bill-item.entity';
import { BillItemService } from './bill-item.service';

@Module({
  imports:[TypeOrmModule.forFeature([BillItemEntity])],
  controllers: [BillItemController],
  providers: [BillItemService]
})
export class BillItemModule {}
