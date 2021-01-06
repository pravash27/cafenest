import { BillItemEntity } from "src/bill-item/bill-item.entity";
import { CustomerEntity } from "src/customer/customer.entity";
import { PaymentEntity } from "src/payment/payment.entity";
import { TableEntity } from "src/table/table.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity('billing')
export class BillingEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(type => BillItemEntity,billItem => billItem.billing)
    billItems: BillItemEntity[];

    @OneToOne(type => PaymentEntity, payment => payment.billing)
    payment: PaymentEntity;

    @Column()
    bill_prefix: string;

    @Column()
    bill_no: number;

    @Column({nullable:true})
    customer_id: string;

    @ManyToOne(type => CustomerEntity,customer => customer.billing)
    @JoinColumn({name:'customer_id'})
    customer: CustomerEntity;

    @Column({type:'datetime'})
    bill_date: Date;

    @Column()
    table_id: number;

    @ManyToOne(type => TableEntity,table => table.billing)
    @JoinColumn({name:'table_id'})
    table: TableEntity

    @Column({default:0,comment:'0 for Pending, 1 for Cleared, 2 for Payment Done'})
    billstatus: number;

    @Column({type: 'double'})
    bill_amount: number;

    @Column({type: 'double'})
    othercharge: number;

    @Column({type: 'double'})
    totalAmount: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}
