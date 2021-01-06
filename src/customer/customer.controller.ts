import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService
    ){}
    
    @Get()
    @UseGuards(new AuthGuard())
    all(){
        return this.customerService.showAll()
    }

    @Get('enabled')
    @UseGuards(new AuthGuard())
    allEnabled(){
        return this.customerService.showEnabled();
    }

    @Post('checkMobile')
    @UseGuards(new AuthGuard())
    async checkMobile(@Body() data: any){
        const {id,mobile} = data;
        const count = await this.customerService.checkMobileNumber(id,mobile);
        if(count > 0){
            return {status:true};
        }
        return {status:false};
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: CustomerDto){
        return this.customerService.create(data);
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id:number,@Body() data: CustomerDto){
        return this.customerService.update(id,data);        
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: number){
        return this.customerService.destroy(id);
    }
}
