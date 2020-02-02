import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UnitEntity } from 'src/unit/unit.entity';
import { ProductCategoryEntity } from 'src/product-category/product-category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,UnitEntity,ProductCategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
