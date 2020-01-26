import { Controller, Post, Patch, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDto } from './product-category.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('product-category')
export class ProductCategoryController {
    constructor(
        private productCategoryService: ProductCategoryService,
    ) {}

    @Get()
    @UseGuards(new AuthGuard())
    all(){
        return this.productCategoryService.showAll();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getOne(@Param('id') id: number){
        return this.productCategoryService.showOne(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: ProductCategoryDto){
        return this.productCategoryService.create(data);
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: number, @Body() data: ProductCategoryDto){
        return this.productCategoryService.update(id,data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: number){
        return this.productCategoryService.destroy(id);
    }

}
