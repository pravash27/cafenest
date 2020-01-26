import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './product-category/product-category.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AdminModule, ProductCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
