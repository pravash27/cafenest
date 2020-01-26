import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './product-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule {}
