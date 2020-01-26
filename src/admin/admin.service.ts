import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity) private adminRepository: Repository<AdminEntity>,
    ) {}

    async checkUser(data: AdminDto) {
        const userdata = await this.adminRepository.findOne({where: {email: data.email}});
        if (!userdata || !(userdata.comparePassword(data.password))) {
            throw new HttpException('User Not Found', 404);
        }
        return userdata.responseObject();
    }

    async allUser() {
        return await this.adminRepository.find();
    }
}
