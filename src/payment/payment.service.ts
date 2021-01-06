import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>
    ){}

    async addPayment(data){
        return await this.paymentRepository.save(data);
    }
}
