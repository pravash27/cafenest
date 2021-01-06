import { BillingEntity } from "src/billing/billing.entity";
import { PaymentEntity } from "src/payment/payment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customer')
export class CustomerEntity{
    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(type => BillingEntity,billing=>billing.customer)
    billing:BillingEntity[];

    @OneToMany(type => PaymentEntity,payment => payment.customer)
    payment: PaymentEntity[];

    @Column({length:100})
    name: string

    @Column({length:20,unique:true})
    mobile: string

    @Column({type:'text'})
    address: string

    @Column({type: 'tinyint', default: '1'})
    status: number;

    @Column({nullable: true})
    loginid: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;

}