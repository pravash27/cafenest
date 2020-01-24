import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';

@Controller('login')
export class AdminController {
    constructor(
        private adminService: AdminService,
    ) {}

    @Post()
    login(@Body() userData: AdminDto) {
        return this.adminService.checkUser(userData);
    }
}
