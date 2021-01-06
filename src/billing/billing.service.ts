import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingEntity } from './billing.entity';

@Injectable()
export class BillingService {
    constructor(
        @InjectRepository(BillingEntity) private billingRepository: Repository<BillingEntity>
    ){}

    async billNo(){
        let billNo = await this.billingRepository.createQueryBuilder('billing').select('MAX(billing.bill_no)',"max").getRawOne();
        return billNo;
    }
    async getSingleBill(id){
        return await this.billingRepository.findOne({where: {id:id},relations: ['billItems', 'customer','table','payment','billItems.product']});
    }
    async saveBill(data){
        await this.billingRepository.create(data);
        return await this.billingRepository.save(data);
    }

    async updateBill(id,data){
        await this.billingRepository.update({id:id},data);
        return this.billingRepository.findOne({id:id});
    }
}
