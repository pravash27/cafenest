import { Controller, Get, UseGuards, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { UnitDto } from 'src/unit/unit.dto';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
    ) {}

    @Get()
    @UseGuards(new AuthGuard())
    all(){
        return this.productService.showAll();
    }

    @Get('enabled')
    @UseGuards(new AuthGuard())
    allEnabled(){
        return this.productService.showEnabled();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getOne(@Param('id') id: number){
        return this.productService.showOne(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: UnitDto){
        return this.productService.create(data);
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: number, @Body() data: UnitDto){
        return this.productService.update(id,data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: number){
        return this.productService.destroy(id);
    }
}
