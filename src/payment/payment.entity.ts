import { BillingEntity } from "src/billing/billing.entity";
import { CustomerEntity } from "src/customer/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('payment')
export class PaymentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bill_id: number;

    @OneToOne(type => BillingEntity, billing => billing.payment)
    @JoinColumn({name:'bill_id'})
    billing: BillingEntity;

    @Column()
    customer_id: number;

    @ManyToOne(type => CustomerEntity, customer => customer.payment)
    @JoinColumn({name:'customer_id'})
    customer: CustomerEntity

    @Column()
    paymentMode: string;

    @Column({type:'double'})
    paidamount: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}