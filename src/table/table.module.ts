import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TableEntity])],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
