import { Controller, Get, UseGuards, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitDto } from './unit.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('unit')
export class UnitController {
    constructor(
        private unitService: UnitService,
    ) {}

    @Get()
    @UseGuards(new AuthGuard())
    all(){
        return this.unitService.showAll();
    }

    @Get('enabled')
    @UseGuards(new AuthGuard())
    allEnabled(){
        return this.unitService.showEnabled();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getOne(@Param('id') id: number){
        return this.unitService.showOne(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: UnitDto){
        return this.unitService.create(data);
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: number, @Body() data: UnitDto){
        return this.unitService.update(id,data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: number){
        return this.unitService.destroy(id);
    }
}
