import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './product-category/product-category.module';
import { UnitModule } from './unit/unit.module';
import { TableModule } from './table/table.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AdminModule, ProductCategoryModule, UnitModule, TableModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
