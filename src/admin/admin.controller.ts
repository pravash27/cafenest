import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './admin.decorator';

@Controller('login')
export class AdminController {
    constructor(
        private adminService: AdminService,
    ) {}

    @Post()
    login(@Body() userData: AdminDto) {
        return this.adminService.checkUser(userData);
    }

    @Get()
    @UseGuards(new AuthGuard())
    users(@User() user) {
        return this.adminService.allUser();
    }
}
