import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillItemEntity } from './bill-item.entity';

@Injectable()
export class BillItemService {
    constructor(
        @InjectRepository(BillItemEntity) private billItemRepository: Repository<BillItemEntity>
    ){}
    async saveBillItem(data){
        const billItem = await this.billItemRepository.create(data)
        return await this.billItemRepository.save(billItem);
    }
}
