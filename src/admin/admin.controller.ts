import { Controller, Post, Body, Get, UseGuards, HttpException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './admin.decorator';


@Controller('auth')
export class AdminController {
    constructor(
        private adminService: AdminService,
    ) {}

    @Post('login')
    login(@Body() userData: AdminDto) {
        return this.adminService.checkUser(userData);
    }

    @Get('list')
    @UseGuards(new AuthGuard())
    users(@User() user) {
        return this.adminService.allUser();
    }

    @Post('checkuser')
    checkUser(@Body() data: AdminDto){
        let token = data.token;
        return this.adminService.authorizeUser(token);
    }
}
