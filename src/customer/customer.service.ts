import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';
import { CustomerEntity } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>
    ){}

    async showAll(){
        return await this.customerRepository.find();
    }
    async showEnabled(){
        return await this.customerRepository.find({status:1});
    }
    async create(data: CustomerDto){
        const customer = await this.customerRepository.create(data);
        await this.customerRepository.save(customer);
        return customer
    }

    async update(id:number,data: CustomerDto){
        await this.customerRepository.update({id:id},data);
        return this.customerRepository.findOne({id:id});
    }

    async destroy(id: number){
        await this.customerRepository.delete({id:id});
        return {status: true};
    }
    async checkMobileNumber(id:number,mobile:string){
        const count = await this.customerRepository.createQueryBuilder('customer')
        .where("customer.id <> :id and customer.mobile = :mobile",{id:id,mobile:mobile})
        .getCount();
        return count;
    }
    async getCustomerByMobile(mobile:string){
        return await this.customerRepository.findOne({mobile:mobile});
    }
}
