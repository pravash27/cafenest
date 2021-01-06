import { Controller, Get, UseGuards, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { TableDto } from './table.dto';
import { TableService } from './table.service';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('table')
export class TableController {
    constructor(
        private tableService: TableService,
    ) {}

    @Get()
    @UseGuards(new AuthGuard())
    all(){
        return this.tableService.showClearedTables();
    }

    @Get('cleared')
    @UseGuards(new AuthGuard())
    allCleared(){
        return this.tableService.showClearedTables();
    }
    
    @Get('enabled')
    @UseGuards(new AuthGuard())
    allEnabled(){
        return this.tableService.showEnabled();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getOne(@Param('id') id: number){
        return this.tableService.showOne(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: TableDto){
        return this.tableService.create(data);
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: number, @Body() data: TableDto){
        return this.tableService.update(id,data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: number){
        return this.tableService.destroy(id);
    }
}
